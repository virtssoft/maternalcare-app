
import React, { useState } from 'react';
import { MapPinned, ArrowRight, Hospital, AlertCircle, Plus, Search, ChevronRight, Clock } from 'lucide-react';

export const ReferralSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');

  const referrals = [
    { id: '1', patient: 'Neema Bahati', from: 'Aire de Santé Rusayo', to: 'HGR Nyiragongo', reason: 'Pré-éclampsie sévère', urgency: 'high', status: 'pending', time: '14:20' },
    { id: '2', patient: 'Zawadi Furaha', from: 'HGR Karisimbi', to: 'Aire de Santé Mabanga', reason: 'Contre-référence post-partum', urgency: 'low', status: 'completed', time: 'Hier' }
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-32 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">Référence & Transferts</h1>
          <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-2">Continuité des soins - Comfort ASBL</p>
        </div>
        <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all">
          <Plus size={18} strokeWidth={3} />
          <span>Nouvelle Référence</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'En attente', val: '04', color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Urgences', val: '02', color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Complétées', val: '18', color: 'text-[#7BAE7F]', bg: 'bg-[#7BAE7F]/10' },
          { label: 'Total Mars', val: '32', color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className={`p-6 rounded-[32px] border border-gray-100 bg-white shadow-sm flex flex-col justify-center`}>
            <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 overflow-x-auto no-scrollbar">
         <button onClick={() => setActiveTab('sent')} className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'sent' ? 'border-[#7BAE7F] text-[#7BAE7F]' : 'border-transparent text-gray-300'}`}>Références Envoyées</button>
         <button onClick={() => setActiveTab('received')} className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'received' ? 'border-[#7BAE7F] text-[#7BAE7F]' : 'border-transparent text-gray-300'}`}>Références Reçues</button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {referrals.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-[40px] border border-gray-100 hover:border-[#7BAE7F]/30 transition-all group cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-xl ${r.urgency === 'high' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                    <AlertCircle size={18} />
                 </div>
                 <h4 className="font-black text-gray-900">{r.patient}</h4>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                r.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-[#7BAE7F]/10 text-[#7BAE7F]'
              }`}>
                {r.status === 'pending' ? 'En attente' : 'Terminé'}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
               <div className="flex items-center gap-2">
                  <Hospital size={16} className="text-[#7BAE7F]" />
                  <span>{r.from}</span>
               </div>
               <ArrowRight size={14} className="hidden md:block" />
               <div className="flex items-center gap-2">
                  <Hospital size={16} className="text-gray-900" />
                  <span>{r.to}</span>
               </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
               <p className="text-xs font-bold text-gray-500 italic">" {r.reason} "</p>
               <div className="flex items-center gap-2 text-[9px] font-black text-gray-300">
                  <Clock size={12} />
                  <span>{r.time}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
