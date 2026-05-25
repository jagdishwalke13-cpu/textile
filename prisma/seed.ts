import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Clean existing database records
  await prisma.product.deleteMany({});
  await prisma.inquiry.deleteMany({});
  await prisma.brochureDownload.deleteMany({});
  await prisma.brochure.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  console.log("Cleared existing records.");

  // 2. Create Default Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.admin.create({
    data: {
      email: "admin@aurasurfaces.com",
      password: hashedPassword,
      name: "Aura Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Created default admin user: ${admin.email}`);

  // 3. Create Default Site Settings
  const settings = [
    { key: "company_name", value: "Aura Surfaces" },
    { key: "contact_email", value: "info@aurasurfaces.com" },
    { key: "contact_phone", value: "+91 99999 88888" },
    { key: "showroom_address", value: "8-A National Highway, Morbi, Gujarat 363641, India" },
    { key: "whatsapp_number", value: "919999988888" },
    { key: "meta_description", value: "Aura Surfaces offers the finest collection of premium porcelain slabs, luxury ceramic tiles, and high-performance outdoor surfaces." },
    { key: "featured_headline", value: "Sculpted by Nature. Perfected by Aura." },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log("Seeded default site settings.");

  // 4. Create Mock Brochures
  const brochure1 = await prisma.brochure.create({
    data: {
      title: "Porcelain Slabs Collection 2026",
      description: "Explore our latest collection of ultra-thin, large-format porcelain slabs for counter-tops, floors, and walls.",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      fileUrl: "/brochures/porcelain-slabs-2026.pdf",
      fileSize: "14.2 MB",
      isActive: true,
    },
  });

  const brochure2 = await prisma.brochure.create({
    data: {
      title: "Outdoor & Special Architectural Catalog",
      description: "Engineered high-thickness exterior porcelain tiles and bespoke decorative slabs for heavy-traffic public spaces.",
      coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      fileUrl: "/brochures/outdoor-architectural-2026.pdf",
      fileSize: "9.8 MB",
      isActive: true,
    },
  });
  console.log("Seeded catalogs/brochures.");

  // 5. Create Beautiful Luxury Products
  const productsData = [
    {
      name: "Calacatta Gold Supreme",
      slug: "calacatta-gold-supreme",
      description: "A breathtaking tribute to classical Italian marble. Calacatta Gold Supreme features delicate gold and warm grey veining floating across a pure, crystalline white background. Engineered to perfection using advanced digital glaze technology, it offers the ultimate premium aesthetic with absolute stain and scratch resistance.",
      shortDescription: "Timeless Italian marble recreation with rich gold veining.",
      category: "PORCELAIN_SLAB",
      subCategory: "Marble Series",
      sizes: ["1200x2780", "1600x3200"],
      finishes: ["Polished (High-Gloss)", "Satin Honed"],
      application: ["Indoor Floors", "Kitchen Countertops", "Wall Cladding", "Vanity Tops"],
      thickness: "15 mm",
      waterAbsorption: "< 0.04%",
      moq: "200 SQM",
      packagingDetails: "Premium A-frame wooden pallets with heavy-duty corner guards. 12 slabs per crate.",
      technicalSpecs: {
        breakingStrength: "> 4000 N",
        scratchResistance: "MOHS 6-7",
        chemicalResistance: "Class UA (Fully Resistant)",
        frostResistance: "Fully Resistant",
      },
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: true,
      isNew: true,
      isBestSeller: true,
      isExportQuality: true,
      qualityGrade: "LUXURY",
      sortOrder: 1,
    },
    {
      name: "Nero Marquina Velvet",
      slug: "nero-marquina-velvet",
      description: "Intense black with dramatic, high-contrast white lightning veins running organically across the slab. Nero Marquina Velvet evokes elegance and bold drama. Perfect for creating striking statement feature walls, monolithic reception desks, or sophisticated bathroom sanctuaries.",
      shortDescription: "Dramatic black porcelain slab with sharp, striking white veins.",
      category: "PORCELAIN_SLAB",
      subCategory: "Marble Series",
      sizes: ["1200x2780", "1600x3200"],
      finishes: ["Velvet Matte", "High Gloss Bookmatch"],
      application: ["Feature Walls", "Fireplace Surrounds", "Bathrooms", "Executive Boardrooms"],
      thickness: "12 mm",
      waterAbsorption: "< 0.05%",
      moq: "200 SQM",
      packagingDetails: "Rigid metal bundle racks, vacuum-sealed protective lining. 15 slabs per bundle.",
      technicalSpecs: {
        breakingStrength: "> 3500 N",
        scratchResistance: "MOHS 6",
        chemicalResistance: "Class UA",
        thermalShock: "Fully Resistant",
      },
      images: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618221195827-0cf16e8cb573?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      isExportQuality: true,
      qualityGrade: "LUXURY",
      sortOrder: 2,
    },
    {
      name: "Statuario Extra Bookmatch",
      slug: "statuario-extra-bookmatch",
      description: "Widely regarded as the holy grail of architectural surfaces, Statuario Extra features dramatic, flowing charcoal grey veins over a pristine milky-white landscape. These slabs are specifically designed to be laid side-by-side to create a mirrored 'bookmatch' pattern that spans across massive architectural installations.",
      shortDescription: "Premium mirrored bookmatch porcelain slab for majestic interiors.",
      category: "PORCELAIN_SLAB",
      subCategory: "Bookmatch Series",
      sizes: ["1600x3200"],
      finishes: ["Polished (Bookmatch A + B)", "Matte Silk"],
      application: ["Grand Entryways", "Luxury Hotel Lobbies", "Penthouses", "Staircases"],
      thickness: "15 mm",
      waterAbsorption: "< 0.04%",
      moq: "100 Pairs (A+B)",
      packagingDetails: "Custom heavy-duty reinforced bookmatch crates. 8 pairs (16 slabs) per crate.",
      technicalSpecs: {
        breakingStrength: "> 4200 N",
        scratchResistance: "MOHS 6",
        chemicalResistance: "Class UA",
        flexuralStrength: ">= 45 N/mm2",
      },
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      isExportQuality: true,
      qualityGrade: "LUXURY",
      sortOrder: 3,
    },
    {
      name: "Moroccan Zellige Ivory",
      slug: "moroccan-zellige-ivory",
      description: "Our Moroccan Zellige collection celebrates beautiful imperfection. Each tile features unique, handcrafted surface variations, undulating glazes, and soft color transitions from pure snow to pearlescent cream. Recreated with absolute precision on durable porcelain backings for effortless laying.",
      shortDescription: "Artisanal glazed ceramic wall tiles with organic surface variation.",
      category: "CERAMIC",
      subCategory: "Artisan Wall Series",
      sizes: ["300x1200", "600x600"],
      finishes: ["Glossy", "Polished"],
      application: ["Wall", "Floor"],
      thickness: "8.5 mm",
      waterAbsorption: "10% - 15% (Wall Only)",
      moq: "50 SQM",
      packagingDetails: "Recyclable corrugated cartons with individual bubble-wrap layer separators. 50 pcs per carton.",
      technicalSpecs: {
        scratchResistance: "MOHS 3-4 (Glazed)",
        chemicalResistance: "Class GA (Household chemicals resistant)",
        crazingResistance: "Fully Guaranteed",
      },
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: false,
      isNew: true,
      isBestSeller: true,
      isExportQuality: false,
      qualityGrade: "PREMIUM",
      sortOrder: 4,
    },
    {
      name: "Morbi Terrazzo Grigio",
      slug: "morbi-terrazzo-grigio",
      description: "A contemporary nod to mid-century modern architecture. Morbi Terrazzo Grigio embeds rich, naturally multi-colored marble chips—ranging from amber orange to deep chocolate—into a cool concrete-grey porcelain base. Combines retro elegance with the extreme longevity and zero-maintenance profile of engineered porcelain.",
      shortDescription: "Modern concrete-grey terrazzo porcelain tile with colorful marble chips.",
      category: "CERAMIC",
      subCategory: "Modern Terrazzo",
      sizes: ["800x800", "600x600"],
      finishes: ["Matte", "Polished"],
      application: ["Floor", "Commercial"],
      thickness: "9 mm",
      waterAbsorption: "< 0.1%",
      moq: "300 SQM",
      packagingDetails: "Standard export cartons on fumigated pine pallets with shrink wrap protection.",
      technicalSpecs: {
        breakingStrength: "> 2200 N",
        scratchResistance: "MOHS 5",
        abrasionResistance: "PEI 4 (Heavy Traffic)",
      },
      images: [
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: false,
      isNew: false,
      isBestSeller: true,
      isExportQuality: true,
      qualityGrade: "PREMIUM",
      sortOrder: 5,
    },
    {
      name: "Pietra di Vals Rock",
      slug: "pietra-di-vals-rock",
      description: "Inspired by the famed quartzite quarries of Vals, Switzerland. Pietra di Vals Rock captures the dense, highly detailed quartz lines and dark blue-grey schist layers of the natural stone. With an R11 anti-slip textured grip rating and a solid 20mm thickness, it is the ultimate surface for high-end landscaping, luxury pools, and high-load outdoor zones.",
      shortDescription: "20mm thick Swiss quartzite replica with R11 anti-slip grip for outdoors.",
      category: "OUTDOOR",
      subCategory: "20mm Thick Stone",
      sizes: ["600x600", "600x900"],
      finishes: ["Textured", "Anti-Skid"],
      application: ["Outdoor", "Commercial"],
      thickness: "20 mm",
      waterAbsorption: "< 0.05%",
      moq: "150 SQM",
      packagingDetails: "Heavy-duty outdoor wooden crates. 32 pieces (22.3 SQM) per crate, total weight 1050kg.",
      technicalSpecs: {
        breakingStrength: "> 12000 N (Extremely High)",
        slipResistance: "R11 (DIN 51130)",
        scratchResistance: "MOHS 7",
        frostResistance: "Guaranteed (DIN EN ISO 10545-12)",
      },
      images: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      isExportQuality: true,
      qualityGrade: "PREMIUM",
      sortOrder: 6,
    },
    {
      name: "Travertine Romano Classic",
      slug: "travertine-romano-classic",
      description: "Recreating the warm, honey-hued sedimentary stone used by ancient Rome. Travertine Romano Classic features beautiful linear vein-cut banding and realistic pits that look exactly like unfilled travertine, without the structural weaknesses or high porosity of natural stone.",
      shortDescription: "Linear vein-cut beige travertine replica for warmth and texture.",
      category: "OUTDOOR",
      subCategory: "Travertine Series",
      sizes: ["600x900", "1200x1200"],
      finishes: ["Matte", "Textured"],
      application: ["Outdoor", "Floor"],
      thickness: "15 mm",
      waterAbsorption: "< 0.05%",
      moq: "250 SQM",
      packagingDetails: "Standard shrink-wrapped crates with thick foam edge buffers.",
      technicalSpecs: {
        breakingStrength: "> 3800 N",
        slipResistance: "R10 / R11",
        scratchResistance: "MOHS 6",
      },
      images: [
        "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: false,
      isNew: false,
      isBestSeller: true,
      isExportQuality: true,
      qualityGrade: "PREMIUM",
      sortOrder: 7,
    },
    {
      name: "Metallic Corten Oxid",
      slug: "metallic-corten-oxid",
      description: "For bold, industrial-inspired architecture. Metallic Corten Oxid mimics real oxidized steel plates with deep rust shades, iridescent gunmetal grey, and subtle, shimmering metallic glints. Ideal for modern urban facades, architectural feature steps, and high-impact interior accents.",
      shortDescription: "Oxidized steel effect slab with high-impact metallic iridescence.",
      category: "SPECIAL",
      subCategory: "Metal Look",
      sizes: ["1200x2400"],
      finishes: ["Satin", "Textured"],
      application: ["Wall", "Commercial"],
      thickness: "6 mm (Slimline)",
      waterAbsorption: "< 0.08%",
      moq: "300 SQM",
      packagingDetails: "Reinforced ultra-long wooden crates to prevent bending of slim slabs.",
      technicalSpecs: {
        breakingStrength: "> 1500 N (High-flexibility slab)",
        scratchResistance: "MOHS 5",
        thermalExpansion: "Extremely Low",
      },
      images: [
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
      ],
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      isExportQuality: true,
      qualityGrade: "LUXURY",
      sortOrder: 8,
    }
  ];

  for (const prod of productsData) {
    const product = await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        shortDescription: prod.shortDescription,
        category: prod.category,
        subCategory: prod.subCategory,
        sizes: JSON.stringify(prod.sizes),
        finishes: JSON.stringify(prod.finishes),
        application: JSON.stringify(prod.application),
        thickness: prod.thickness,
        waterAbsorption: prod.waterAbsorption,
        moq: prod.moq,
        packagingDetails: prod.packagingDetails,
        technicalSpecs: JSON.stringify(prod.technicalSpecs),
        images: JSON.stringify(prod.images),
        isFeatured: prod.isFeatured,
        isNew: prod.isNew,
        isBestSeller: prod.isBestSeller,
        isExportQuality: prod.isExportQuality,
        qualityGrade: prod.qualityGrade,
        sortOrder: prod.sortOrder,
      },
    });
    console.log(`Created product: ${product.name} (${product.category})`);
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
