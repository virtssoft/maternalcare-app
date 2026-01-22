
import React, { useState } from 'react';
import { UserPlus, Users, Building2, MapPin, ChevronRight, UserCheck, Shield } from 'lucide-react';
import { UserRole, User } from '../types';

interface AdminPanelProps {
  user: User;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const renderAireAdmin = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase">Gestion Communautaire</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.facility}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#7BAE7F] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#7BAE7F]/20"
        >
          <UserPlus size={16} strokeWidth={3} />
          <span>Inscrire une Maman</span>
        </button>
      </div>

      <div className="grid gap-4">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Patientes inscrites récemment</p>
        {[
          { name: 'Maman Divine', phone: '0841234567', week: 28 },
          { name: 'Sifa Malaika', phone: '0810009988', week: 14 }
        ].map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Users size={20} /></div>
              <div>
                <p className="font-black text-gray-900">{p.name}</p>
                <p className="text-xs font-bold text-gray-400">Tél: {p.phone} • Semaine {p.week}</p>
              </div>
            </div>
            <button className="p-3 text-gray-300 hover:text-[#7BAE7F] transition-all"><ChevronRight size={20} /></button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="bg-white w-full max-w-lg rounded-[48px] p-10 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Nouvelle Inscription</h3>
            <form className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nom Complet de la Maman</label>
                 <input type="text" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl outline-none focus:border-[#7BAE7F] font-bold" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Numéro de Téléphone (Compte)</label>
                 <input type="tel" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl outline-none focus:border-[#7BAE7F] font-bold" />
               </div>
               <button className="w-full bg-[#7BAE7F] text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#7BAE7F]/30 mt-4">
                 Créer le compte communautaire
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderZoneAdmin = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-gray-900 uppercase">Supervision Zone : {user.zone}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { name: 'Aire de Santé Rusayo', staff: 12, patients: 145 },
          { name: 'Aire de Santé Kiziba', staff: 8, patients: 92 },
          { name: 'HGR Nyiragongo', staff: 45, patients: 320 }
        ].map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <Building2 className="text-[#7BAE7F] mb-4" size={32} />
             <h4 className="font-black text-gray-900 text-lg mb-1">{f.name}</h4>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Nyiragongo, Nord-Kivu</p>
             <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-300 uppercase">Prestataires</p>
                   <p className="text-lg font-black text-gray-800">{f.staff}</p>
                </div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-300 uppercase">Patientes</p>
                   <p className="text-lg font-black text-gray-800">{f.patients}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDPSAdmin = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gray-900 rounded-[48px] p-10 text-white relative overflow-hidden mb-10">
         <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2 uppercase">Console DPS Nord-Kivu</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Gestion du Système Provincial</p>
         </div>
         <Shield size={80} className="absolute right-10 bottom-10 text-white/5" />
      </div>

      <div className="grid gap-6">
         {['Zone de Santé Goma', 'Zone de Santé Karisimbi', 'Zone de Santé Nyiragongo'].map((z, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#7BAE7F] transition-all">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#7BAE7F] transition-colors"><MapPin size={24} /></div>
                 <div>
                    <h4 className="font-black text-gray-900 text-lg">{z}</h4>
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">8 Aires de Santé rattachées</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-black text-[#7BAE7F] uppercase">Actif</span>
                    <span className="text-xs font-bold text-gray-400">Dernière synchro: 2 min</span>
                 </div>
                 <ChevronRight size={24} className="text-gray-200" />
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 pb-32">
      {user.role === UserRole.ADMIN_AIRE && renderAireAdmin()}
      {user.role === UserRole.ADMIN_ZONE && renderZoneAdmin()}
      {user.role === UserRole.ADMIN_DPS && renderDPSAdmin()}
    </div>
  );
};
