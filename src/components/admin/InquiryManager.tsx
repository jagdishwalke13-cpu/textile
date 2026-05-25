import React, { useState, useEffect } from 'react';
import { Download, MessageCircle, Mail, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function InquiryManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  
  const [adminNotes, setAdminNotes] = useState('');
  const [status, setStatus] = useState('');

  const fetchInquiries = () => {
    setLoading(true);
    fetch('/api/admin/inquiries')
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSelect = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.adminNotes || '');
    setStatus(inquiry.status);
  };

  const handleUpdate = async () => {
    if (!selectedInquiry) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      if (res.ok) {
        toast.success('Inquiry updated');
        fetchInquiries();
        setSelectedInquiry({ ...selectedInquiry, status, adminNotes });
      } else {
        toast.error('Failed to update inquiry');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      {/* Left List */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <h2 className="text-lg font-bold text-white">Inquiries</h2>
          <Button variant="outline" className="h-8 px-3 border-zinc-700 hover:bg-zinc-800 text-xs text-white">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0">
          {loading ? (
             <div className="p-8 text-center text-zinc-500">Loading...</div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {inquiries.map(inquiry => (
                <div 
                  key={inquiry.id} 
                  onClick={() => handleSelect(inquiry)}
                  className={`p-4 cursor-pointer hover:bg-zinc-800 transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-brand-primary/10 border-l-2 border-brand-primary' : 'border-l-2 border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-white">{inquiry.name}</span>
                    <span className="text-xs text-zinc-500">{format(new Date(inquiry.createdAt), 'MMM dd')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">{inquiry.type}</span>
                    <span className={`px-2 py-0.5 rounded-sm border ${
                      inquiry.status === 'NEW' ? 'text-red-400 border-red-400/20 bg-red-400/10' :
                      inquiry.status === 'IN_PROGRESS' ? 'text-amber-400 border-amber-400/20 bg-amber-400/10' :
                      'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && <div className="p-8 text-center text-zinc-500">No inquiries yet.</div>}
            </div>
          )}
        </div>
      </div>

      {/* Right Detail Panel */}
      <div className="w-full lg:w-96 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
        {selectedInquiry ? (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">{selectedInquiry.name}</h2>
              <div className="flex flex-col gap-1 mt-3">
                <a href={`mailto:${selectedInquiry.email}`} className="text-sm flex items-center text-zinc-400 hover:text-brand-primary">
                  <Mail className="w-4 h-4 mr-2" /> {selectedInquiry.email}
                </a>
                <a href={`tel:${selectedInquiry.phone}`} className="text-sm flex items-center text-zinc-400 hover:text-brand-primary">
                  <MessageCircle className="w-4 h-4 mr-2" /> {selectedInquiry.phone}
                </a>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Message</h4>
                <div className="bg-zinc-950 p-4 rounded-lg text-sm text-zinc-300 whitespace-pre-wrap border border-zinc-800">
                  {selectedInquiry.message || 'No message provided.'}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Details</h4>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="block text-zinc-500">City/Country</span>
                    <span className="text-white">{selectedInquiry.city || '-'} / {selectedInquiry.country || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-500">Project Type</span>
                    <span className="text-white">{selectedInquiry.projectType || '-'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-zinc-500">Address (Courier)</span>
                    <span className="text-white">{selectedInquiry.address || '-'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-zinc-500">Product Interest</span>
                    <span className="text-white">
                       {Array.isArray(selectedInquiry.productInterest) ? selectedInquiry.productInterest.join(', ') : '-'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Admin Actions</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Status</label>
                    <select 
                      value={status} 
                      onChange={e => setStatus(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm"
                    >
                      <option value="NEW">New</option>
                      <option value="READ">Read</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Admin Notes</label>
                    <textarea 
                      value={adminNotes} 
                      onChange={e => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes here..."
                      className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary text-sm h-24 resize-none"
                    />
                  </div>

                  <Button onClick={handleUpdate} className="w-full bg-brand-primary text-white h-10 uppercase text-xs tracking-widest font-bold">
                    Save Changes
                  </Button>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      render={<a href={`mailto:${selectedInquiry.email}`} />}
                      variant="outline" 
                      className="flex-1 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs h-10"
                    >
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                    <Button 
                      render={<a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" />}
                      variant="outline" 
                      className="flex-1 border-emerald-900 bg-emerald-950/50 hover:bg-emerald-900 text-emerald-400 text-xs h-10"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 text-center text-zinc-500 h-full flex-col">
            <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
            <p>Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
