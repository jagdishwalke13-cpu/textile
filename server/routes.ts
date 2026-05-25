import express, { Express, Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import nodemailer from "nodemailer";
import multer from "multer";
import cookieParser from "cookie-parser";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_dev_only";

export function registerRoutes(app: Express) {
  // SEO Routes
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /

Sitemap: ${process.env.APP_URL || `http://${req.headers.host}`}/sitemap.xml`);
  });

  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = process.env.APP_URL || `http://${req.headers.host}`;
    
    try {
      const products = await prisma.product.findMany({ select: { slug: true, category: true } });
      const staticPages = ['', '/about', '/contact', '/products', '/brochure', '/export', '/utilities'];
      
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      staticPages.forEach(page => {
        xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
      });

      products.forEach(p => {
        xml += `
  <url>
    <loc>${baseUrl}/products/${p.category.toLowerCase().replace(/_/g, '-')}/${p.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      xml += `\n</urlset>`;
      
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (e) {
      res.status(500).end();
    }
  });

  app.set("trust proxy", 1);

  // Parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    validate: { xForwardedForHeader: false }
  });
  
  app.use("/api/", apiLimiter);

  // Authentication Middleware
  const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.admin_token || (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
      (req as any).adminId = decoded.id;
      (req as any).adminRole = decoded.role;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Setup Email (Nodemailer)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: parseInt(process.env.SMTP_PORT || "2525"),
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASS || "pass",
    },
  });

  const sendEmail = async (to: string, subject: string, html: string) => {
    try {
      if (process.env.SMTP_HOST) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Aura Surfaces" <noreply@aurasurfaces.com>',
          to, subject, html
        });
      } else {
        console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
      }
    } catch (e) {
      console.error("Email error:", e);
    }
  };

  // ====== PUBLIC ROUTES ======

  // Public Settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await prisma.siteSetting.findMany();
      const settingsMap = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
      res.json(settingsMap);
    } catch(e) {
      res.status(500).json({ error: "Failed to load settings" });
    }
  });

  // Helper to map DB product to Frontend-expected structure
  function mapProduct(p: any) {
    if (!p) return null;
    
    let imagesArr: string[] = [];
    try {
      imagesArr = typeof p.images === 'string' ? JSON.parse(p.images) : (p.images || []);
    } catch (e) {
      imagesArr = [];
    }

    let sizesArr: string[] = [];
    try {
      sizesArr = typeof p.sizes === 'string' ? JSON.parse(p.sizes) : (p.sizes || []);
    } catch (e) {
      sizesArr = [];
    }

    let finishesArr: string[] = [];
    try {
      finishesArr = typeof p.finishes === 'string' ? JSON.parse(p.finishes) : (p.finishes || []);
    } catch (e) {
      finishesArr = [];
    }

    let appArr: string[] = [];
    try {
      appArr = typeof p.application === 'string' ? JSON.parse(p.application) : (p.application || []);
    } catch (e) {
      appArr = [];
    }

    let specsObj: any = {};
    try {
      specsObj = typeof p.technicalSpecs === 'string' ? JSON.parse(p.technicalSpecs) : (p.technicalSpecs || {});
    } catch (e) {
      specsObj = {};
    }

    let filesObj: any = {};
    try {
      filesObj = typeof p.downloadableFiles === 'string' ? JSON.parse(p.downloadableFiles) : (p.downloadableFiles || {});
    } catch (e) {
      filesObj = {};
    }

    // Determine Category string
    const categoryLabelMap: Record<string, string> = {
      'PORCELAIN_SLAB': 'Porcelain Slab Tiles',
      'CERAMIC': 'Ceramic Tiles',
      'OUTDOOR': 'Outdoor Tiles',
      'SPECIAL': 'Special'
    };
    const categoryLabel = categoryLabelMap[p.category] || p.category;

    return {
      ...p,
      category: categoryLabel,
      images: imagesArr,
      sizes: sizesArr,
      finishes: finishesArr,
      application: appArr,
      technicalSpecs: specsObj,
      downloadableFiles: filesObj,
      // Frontend mapped fields:
      imageUrl: imagesArr[0] || '',
      gallery: imagesArr,
      dimensions: sizesArr[0] || '1200x2400',
      availableSizes: sizesArr,
      finishType: finishesArr[0] || 'Glossy',
      availableFinishes: finishesArr,
      specifications: {
        "Thickness": p.thickness || "15 mm",
        "Water Absorption": p.waterAbsorption || "< 0.05%",
        "MOQ": p.moq || "200 SQM",
        "Packaging": p.packagingDetails || "Standard",
        ...specsObj
      },
      badge: p.isNew ? "New" : (p.isBestSeller ? "Bestseller" : (p.isFeatured ? "Featured" : null)),
      rating: p.isFeatured ? 4.9 : 4.7,
      reviewsCount: p.isBestSeller ? 34 : 12,
    };
  }

  // Fetch Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search, size, finish, application, grade, sort, limit = "20", page = "1" } = req.query;
      const parsedLimit = parseInt(limit as string);
      const parsedPage = parseInt(page as string);
      const skip = (parsedPage - 1) * parsedLimit;

      // 1. Fetch all matching products in the category or text search from DB (SQLite)
      // Since SQLite doesn't support advanced in-JSON filtering easily, we'll fetch candidate products
      // and perform filtering, sorting, and pagination in memory. This is highly performant and robust for development.
      let where: any = {};
      
      // Handle category filtering
      if (category) {
        // category could be comma separated or single
        const catStr = category as string;
        const categoriesList = catStr.split(',').map(c => {
          // Map frontend categories to database format if necessary
          if (c === 'Porcelain Slab Tiles') return 'PORCELAIN_SLAB';
          if (c === 'Ceramic Tiles') return 'CERAMIC';
          if (c === 'Outdoor Tiles') return 'OUTDOOR';
          if (c === 'Special') return 'SPECIAL';
          return c.toUpperCase().replace(/ /g, '_');
        });
        where.category = { in: categoriesList };
      }

      if (search) {
        where.OR = [
          { name: { contains: search as string } },
          { description: { contains: search as string } }
        ];
      }

      // Fetch from DB
      const dbProducts = await prisma.product.findMany({
        where,
        orderBy: { sortOrder: 'asc' }
      });

      // 2. Map products and apply in-memory filter criteria
      let productsList = dbProducts.map(mapProduct).filter(Boolean) as any[];

      // Filter by sizes
      if (size) {
        const sizesList = (size as string).split(',');
        productsList = productsList.filter(p => 
          p.availableSizes && p.availableSizes.some((s: string) => sizesList.includes(s))
        );
      }

      // Filter by finishes
      if (finish) {
        const finishesList = (finish as string).split(',');
        productsList = productsList.filter(p => 
          p.availableFinishes && p.availableFinishes.some((f: string) => finishesList.includes(f))
        );
      }

      // Filter by applications
      if (application) {
        const appsList = (application as string).split(',');
        productsList = productsList.filter(p => 
          p.application && p.application.some((a: string) => appsList.includes(a))
        );
      }

      // Filter by grade (qualityGrade)
      if (grade) {
        const gradesList = (grade as string).split(',').map(g => g.toUpperCase());
        productsList = productsList.filter(p => gradesList.includes(p.qualityGrade.toUpperCase()));
      }

      // 3. Apply sorting
      if (sort === 'name_asc') {
        productsList.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'name_desc') {
        productsList.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sort === 'size_asc') {
        productsList.sort((a, b) => {
          const sizeA = a.dimensions || '';
          const sizeB = b.dimensions || '';
          return sizeA.localeCompare(sizeB);
        });
      } else { // default or 'newest'
        productsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      // 4. Paginate
      const total = productsList.length;
      const paginatedList = productsList.slice(skip, skip + parsedLimit);

      res.json({ 
        data: paginatedList, 
        total, 
        page: parsedPage, 
        totalPages: Math.ceil(total / parsedLimit) 
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Single Product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await prisma.product.findFirst({ 
        where: {
          OR: [
            { id: req.params.id },
            { slug: req.params.id }
          ]
        }
      });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(mapProduct(product));
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Contact Inquiry
  const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    city: z.string().optional(),
    inquiryType: z.enum(['Product Inquiry', 'Export Inquiry', 'Showroom Visit', 'Other']).optional().default('Product Inquiry'),
    message: z.string().min(1),
    productInterest: z.array(z.string()).optional(),
    projectType: z.string().optional(),
    quantity: z.string().optional(),
    source: z.string().optional(),
    fileName: z.string().optional()
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      
      const typeMapping: Record<string, "PRODUCT" | "EXPORT" | "SHOWROOM" | "GENERAL" | "SAMPLE"> = {
        'Product Inquiry': 'PRODUCT',
        'Export Inquiry': 'EXPORT',
        'Showroom Visit': 'SHOWROOM',
        'Sample Request': 'SAMPLE',
        'Other': 'GENERAL'
      };

      const inquiry = await prisma.inquiry.create({
        data: {
          type: typeMapping[data.inquiryType || 'Product Inquiry'] || 'GENERAL',
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          address: (data as any).address,
          message: data.message,
          productInterest: data.productInterest || [],
          projectType: data.projectType,
          quantityEstimate: data.quantity,
          source: data.source,
          referenceImageUrl: data.fileName
        }
      });

      const adminEmailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: #111; color: #fff; padding: 20px;">
            <h2 style="margin: 0;">Aura Surfaces</h2>
          </div>
          <div style="padding: 20px;">
            <h3>New ${data.inquiryType} from ${data.name}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>City/Country:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.city || 'N/A'}</td></tr>
              ${(data as any).address ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address (Courier):</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(data as any).address}</td></tr>` : ''}
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${data.message}</td></tr>
            </table>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
               <a href="${process.env.APP_URL || 'https://aurasurfaces.com'}/admin/inquiries" style="background: #000; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 4px; display: inline-block;">View in Admin Panel</a>
               <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(data.name)},%20this%20is%20from%20Aura%20Surfaces.%20Thank%20you%20for%20your%20inquiry." style="background: #25D366; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 4px; display: inline-block;">WhatsApp Reply</a>
               <a href="mailto:${data.email}" style="background: #007bff; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 4px; display: inline-block;">Email Reply</a>
            </div>
          </div>
        </div>
      `;

      await sendEmail(
        data.email, 
        "Thank you for contacting Aura Surfaces",
        `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: #111; color: #fff; padding: 20px;">
            <h2 style="margin: 0;">Aura Surfaces</h2>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${data.name},</p>
            <p>We've received your ${data.inquiryType.toLowerCase()} regarding: <em>${data.message.substring(0, 50)}...</em></p>
            <p>Our team will get back to you within 24 hours.</p>
            <p>Need a faster response?</p>
            <a href="https://wa.me/919999999999" style="background: #25D366; color: #fff; text-decoration: none; padding: 10px 15px; border-radius: 4px; display: inline-block; margin-bottom: 20px;">Chat on WhatsApp</a>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px;">
               <strong>Showroom:</strong> 8-A National Highway, Morbi, Gujarat, India<br/>
               <strong>Hours:</strong> Mon-Sat 09:30 - 18:30
            </div>
          </div>
        </div>`
      );

      await sendEmail(
        process.env.ADMIN_EMAIL || "admin@aurasurfaces.com", 
        `🔔 New ${data.inquiryType} from ${data.name} — ${data.city || 'Visitor'}`,
        adminEmailHtml
      );

      res.status(201).json({ success: true, inquiryId: inquiry.id, message: "Inquiry submitted successfully." });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Invalid data or failed to submit inquiry" });
    }
  });

  // Export Inquiry
  const exportSchema = z.object({
    companyName: z.string().min(1),
    country: z.string().min(1),
    contactName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    productInterest: z.array(z.string()).optional(),
    volume: z.string().optional(),
    targetMarket: z.string().optional(),
    message: z.string().optional()
  });

  app.post("/api/export-inquiries", async (req, res) => {
    try {
      const data = exportSchema.parse(req.body);
      
      const inquiry = await prisma.inquiry.create({
        data: {
          type: "EXPORT",
          name: data.contactName,
          company: data.companyName,
          country: data.country,
          email: data.email,
          phone: data.phone,
          productInterest: data.productInterest || [],
          quantityEstimate: data.volume,
          message: `Target Market: ${data.targetMarket || 'N/A'}\nMessage: ${data.message || ''}`,
        }
      });

      await sendEmail(
        data.email, 
        "Export Partnership Inquiry - Aura Surfaces",
        `<p>Dear ${data.contactName},</p><p>Thank you for reaching out regarding export opportunities. Our export team will contact you within 24 hours.</p>`
      );

      res.status(201).json({ success: true, inquiryId: inquiry.id, message: "Export inquiry submitted successfully." });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Invalid data or failed to submit export inquiry" });
    }
  });

  // Brochure Requests
  const brochureValSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    company: z.string().optional(),
    city: z.string().min(1),
    brochureTitle: z.string().min(1)
  });

  app.post("/api/brochure-requests", async (req, res) => {
    try {
      const data = brochureValSchema.parse(req.body);
      
      let brochure = await prisma.brochure.findFirst({ where: { title: data.brochureTitle } });
      
      // If no DB seeded yet, mock it
      if (!brochure) {
        brochure = { id: "mock-id", title: data.brochureTitle, description: null, coverImage: null, fileUrl: "/mock-brochure.pdf", fileSize: null, downloadCount: 0, isActive: true, createdAt: new Date() };
      }

      await prisma.brochureDownload.create({
        data: {
          brochureId: brochure.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          city: data.city
        }
      });

      if (brochure.id !== "mock-id") {
        await prisma.brochure.update({
          where: { id: brochure.id },
          data: { downloadCount: { increment: 1 } }
        });
      }

      await sendEmail(
        data.email, 
        "Your Brochure Download - Aura Surfaces",
        `<p>Dear ${data.name},</p><p>Here is the link to your requested brochure: <a href="${brochure.fileUrl}">Download PDF</a></p>`
      );

      res.status(201).json({ success: true, downloadUrl: brochure.fileUrl, message: "Brochure request submitted successfully." });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Failed to process brochure request" });
    }
  });

  app.get("/api/brochures", async (req, res) => {
    try {
      const brochures = await prisma.brochure.findMany({ where: { isActive: true } });
      res.json(brochures);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });

  // ====== ADMIN ROUTES ======

  const loginAttempts = new Map<string, { count: number, lockedUntil: Date | null }>();

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const attempt = loginAttempts.get(email) || { count: 0, lockedUntil: null };
      if (attempt.lockedUntil && new Date() < attempt.lockedUntil) {
        return res.status(403).json({ error: "Account locked. Please try again later." });
      }

      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        attempt.count++;
        if (attempt.count >= 5) attempt.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        loginAttempts.set(email, attempt);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        attempt.count++;
        if (attempt.count >= 5) attempt.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
        loginAttempts.set(email, attempt);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Successful login
      loginAttempts.delete(email);

      const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: "1d" });
      
      await prisma.admin.update({ where: { id: admin.id }, data: { lastLogin: new Date() } });

      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (e) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
  });

  app.get("/api/admin/me", authenticateAdmin, async (req, res) => {
    try {
      const admin = await prisma.admin.findUnique({ where: { id: (req as any).adminId } });
      if (!admin) return res.status(404).json({ error: "Not found" });
      res.json({ id: admin.id, name: admin.name, email: admin.email, role: admin.role });
    } catch (e) {
      res.status(500).json({ error: "Failed" });
    }
  });

  app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const [newInquiriesToday, totalProducts, brochureDownloadsThisMonth, totalInquiries, recentInquiries] = await Promise.all([
        prisma.inquiry.count({ where: { createdAt: { gte: today }, status: 'NEW' } }),
        prisma.product.count(),
        prisma.brochureDownload.count({ where: { createdAt: { gte: firstDayOfMonth } } }),
        prisma.inquiry.count(),
        prisma.inquiry.findMany({ take: 10, orderBy: { createdAt: 'desc' } })
      ]);

      res.json({
        newInquiriesToday,
        totalProducts,
        brochureDownloadsThisMonth,
        totalInquiries,
        recentInquiries
      });
    } catch (e) {
       res.status(500).json({ error: "Failed to load stats" });
    }
  });

  app.get("/api/admin/inquiries", authenticateAdmin, async (req, res) => {
    try {
      const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
      res.json(inquiries);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.put("/api/admin/inquiries/:id", authenticateAdmin, async (req, res) => {
    try {
      const { status, adminNotes, assignedTo } = req.body;
      
      const inquiryBefore = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
      
      const inquiry = await prisma.inquiry.update({
        where: { id: req.params.id },
        data: { 
          status, 
          adminNotes, 
          assignedTo,
          resolvedAt: status === 'CLOSED' ? new Date() : undefined
        }
      });

      if (inquiryBefore && inquiryBefore.status !== status) {
        if (status === 'IN_PROGRESS') {
          await sendEmail(
            inquiry.email,
            "Your inquiry is being reviewed - Aura Surfaces",
            `<div style="font-family: sans-serif; padding: 20px;"><p>Dear ${inquiry.name},</p><p>Your inquiry is currently being reviewed by our team. We will update you with a full response shortly.</p></div>`
          );
        } else if (status === 'CLOSED') {
          await sendEmail(
            inquiry.email,
            "Your inquiry has been resolved - Aura Surfaces",
            `<div style="font-family: sans-serif; padding: 20px;">
              <p>Dear ${inquiry.name},</p>
              <p>Your inquiry has been marked as resolved.</p>
              <div style="background:#f4f4f4; padding:15px; border-radius:8px; margin: 15px 0;">
                 <strong>Summary of resolution:</strong>
                 <p>${adminNotes || 'Handled by our specialist team.'}</p>
              </div>
              <p>How was your experience? Reply to this email with a ⭐⭐⭐⭐⭐ rating!</p>
            </div>`
          );
        }
      }

      res.json(inquiry);
    } catch (e) {
      res.status(500).json({ error: "Failed to update inquiry" });
    }
  });

  app.post("/api/admin/products", authenticateAdmin, async (req, res) => {
    try {
      const product = await prisma.product.create({ data: req.body });
      res.status(201).json(product);
    } catch (e) {
      res.status(400).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      const product = await prisma.product.update({
        where: { id: req.params.id },
        data: req.body
      });
      res.json(product);
    } catch (e) {
      res.status(400).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      if ((req as any).adminRole !== 'SUPER_ADMIN') {
        return res.status(403).json({ error: "Only SUPER_ADMIN can delete products" });
      }
      await prisma.product.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Settings Endpoints
  const getSettingsMap = async () => {
    const settings = await prisma.siteSetting.findMany();
    return settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
  };

  app.get("/api/admin/settings", authenticateAdmin, async (req, res) => {
    try {
      res.json(await getSettingsMap());
    } catch(e) {
      res.status(500).json({ error: "Failed to get settings" });
    }
  });

  app.put("/api/admin/settings", authenticateAdmin, async (req, res) => {
    try {
      const updates = req.body;
      for (const [key, value] of Object.entries(updates)) {
         await prisma.siteSetting.upsert({
           where: { key },
           update: { value: value as string },
           create: { key, value: value as string }
         });
      }
      res.json({ success: true });
    } catch(e) {
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  // Brochure Admin
  app.post("/api/admin/brochures", authenticateAdmin, async (req, res) => {
    try {
      const b = await prisma.brochure.create({ data: req.body });
      res.status(201).json(b);
    } catch(e) {
      res.status(500).json({ error: "Failed" });
    }
  });

  app.put("/api/admin/brochures/:id", authenticateAdmin, async (req, res) => {
    try {
      const b = await prisma.brochure.update({ where: { id: req.params.id }, data: req.body });
      res.json(b);
    } catch(e) {
      res.status(500).json({ error: "Failed" });
    }
  });

  // Mock Upload Route
  const upload = multer({ dest: 'uploads/' });
  app.post("/api/admin/upload", authenticateAdmin, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ url: `https://res.cloudinary.com/demo/image/upload/sample.jpg`, success: true });
  });

  // Daily Digest Internal Trigger (simulated cron endpoint)
  app.post("/api/cron/daily-digest", async (req, res) => {
    try {
      if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET || 'dev-cron-secret'}`) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const newInquiries = await prisma.inquiry.count({ where: { createdAt: { gte: yesterday } } });
      const pendingInquiries = await prisma.inquiry.count({ where: { status: { in: ['NEW', 'IN_PROGRESS'] } } });
      const brochureDownloads = await prisma.brochureDownload.count({ where: { createdAt: { gte: yesterday } } });

      const digestHtml = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Daily Digest - Aura Surfaces</h2>
          <p>Here is the summary of activities from the last 24 hours:</p>
          <ul>
            <li><strong>New Inquiries:</strong> ${newInquiries}</li>
            <li><strong>Pending Inquiries (Total):</strong> ${pendingInquiries}</li>
            <li><strong>Brochure Downloads:</strong> ${brochureDownloads}</li>
          </ul>
        </div>
      `;

      await sendEmail(
        process.env.ADMIN_EMAIL || "admin@aurasurfaces.com",
        "Daily Digest - Aura Surfaces",
        digestHtml
      );
      
      res.json({ success: true, message: "Digest sent." });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to send digest" });
    }
  });
}
