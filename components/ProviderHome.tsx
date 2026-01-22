
import React, { useEffect, useState } from 'react';
import { Users, Plus, Activity, Bell, MapPin, Clipboard, TrendingUp, ShieldAlert } from 'lucide-react';
import { getProviderDashboardSummary } from '../services/geminiService';
import { UserRole } from '../types';

interface ProviderHomeProps {
  role: UserRole;
}

export const ProviderHome: React.FC<ProviderHomeProps> = ({ role }) => {
  const [summary, setSummary] = useState<string>('Analyse clinique en cours...');

  useEffect(() => {
    getProviderDashboardSummary(124, 3).then(setSummary);
  }, []);

  const stats = {
    [UserRole.ADMIN_AIRE]: [
      { label: 'Visites CPN', value: '18', icon: Users, color: 'bg-blue-50 text-blue-500' },
      { label: 'Partogrammes', value: '03', icon: Activity, color: 'bg-orange-50 text-orange-500' },
      { label: 'Alertes Locales', value: '02', icon: Bell, color: 'bg-red-50 text-red-500' },
      { label: 'Réf. Envoyées', value: '01', icon: MapPin, color: 'bg-[#7BAE7F]/10 text-[#7BAE7F]' },
    ],
    [UserRole.ADMIN_ZONE]: [
      { label: 'Aires Actives', value: '12', icon: Activity, color: 'bg-blue-50 text-blue-500' },
      { label: 'Total CPN', value: '240', icon: Users, color: 'bg-[#7BAE7F]/10 text-[#7BAE7F]' },
      { label: 'Urgences Zone', value: '08', icon: ShieldAlert, color: 'bg-red-50 text-red-500' },
      { label: 'Taux de Couverture', value: '78%', icon: TrendingUp, color: 'bg-orange-50 text-orange-500' },
    ],
    [UserRole.ADMIN_DPS]: [
      { label: 'Zones Santé', value: '03', icon: Activity, color: 'bg-blue-50 text-blue-500' },
      { label: 'Population Suivie', value: '1,2k', icon: Users, color: 'bg-[#7BAE7F]/10 text-[#7BAE7F]' },
      { label: 'Alertes Prov.', value: '14', icon: ShieldAlert, color: 'bg-red-50 text-red-500' },
      { label: 'Impact ODD3', value: '+12%', icon: TrendingUp, color: 'bg-orange-50 text-orange-500' },
    ]
  };

  const currentStats = stats[role as keyof typeof stats] || stats[UserRole.ADMIN_AIRE];

  return (
    <div className="pb-32 px-6 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">
            {role === UserRole.ADMIN_DPS ? 'Supervision Provinciale' : role === UserRole.ADMIN_ZONE ? 'Indicateurs Zone' : 'Espace Clinique'}
          </h1>
          <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-2">Édition Comfort ASBL • Nord-Kivu</p>
        </div>
      </div>

      <section className="mb-10">
        <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-[#7BAE7F]/20 rounded-2xl flex items-center justify-center text-[#7BAE7F] shrink-0">
                 <Clipboard size={32} />
              </div>
              <p className="text-lg font-bold leading-relaxed italic text-gray-100">"{summary}"</p>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BAE7F]/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {currentStats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.color}`}><s.icon size={20} /></div>
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-2xl font-black text-gray-900 leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Activités Récentes</h2>
          <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden">
             {[1, 2, 3].map(i => (
               <div key={i} className="p-6 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300"><Activity size={20} /></div>
                     <div><p className="font-bold text-sm text-gray-800">Saisie de données effectuée</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Il y a {i*10} min</p></div>
                  </div>
                  <Plus size={16} className="text-gray-200" />
               </div>
             ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col items-center justify-center text-center opacity-40">
           <MapPin size={48} className="text-[#7BAE7F] mb-4" />
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Géolocalisation des structures bientôt active</p>
        </div>
      </div>
    </div>
  );
};
