import React, { useState, useEffect } from 'react';
import { Package, Search, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function ProductsManager({ adminRole }: { adminRole: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (adminRole !== 'SUPER_ADMIN') {
      toast.error('Only SUPER_ADMIN can delete products');
      return;
    }
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div>
          <h2 className="text-2xl font-heading text-white">Products Manager</h2>
          <p className="text-zinc-400 text-sm">Manage your catalog, images, and categories.</p>
        </div>
        <Button className="bg-brand-primary text-white hover:bg-brand-primary/90 h-10 px-4 text-xs tracking-widest uppercase font-bold rounded-lg">
          <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-8 text-center text-zinc-500">Loading products...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Product</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Category</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Grade</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded overflow-hidden">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 m-2.5 text-zinc-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{product.name}</p>
                          <p className="text-xs text-zinc-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      <span className="bg-zinc-800 text-xs px-2 py-1 rounded border border-zinc-700">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-300">
                      <span className="text-xs px-2 py-1 rounded border border-zinc-700">{product.qualityGrade}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        {adminRole === 'SUPER_ADMIN' && (
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-red-400 hover:text-white bg-red-400/10 hover:bg-red-500 rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                   <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No products found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
