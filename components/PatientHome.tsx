
import React, { useEffect, useState } from 'react';
import { Search, MapPin, Star, ArrowUpRight, Sparkles, Calendar, ChevronRight, Heart, Baby } from 'lucide-react';
import { getPregnancyTips } from '../services/geminiService';

export const PatientHome: React.FC<{ week: number }> = ({ week }) => {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPregnancyTips(week).then(data => {
      setTips(data);
      setLoading(false);
    });
  }, [week]);

  return (
    <div className="pb-32 px-6 pt-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 leading-none tracking-tight">Maman & Bébé</h1>
        <p className="text-sm font-medium text-gray-400 mt-2 italic">Chaque jour est une nouvelle étape.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Pregnancy Hero Card */}
        <section className="lg:col-span-2">
          <div className="bg-[#7BAE7F] rounded-[48px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-[#7BAE7F]/20 group">
             <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                   <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-md">
                      <Baby size={24} />
                   </div>
                   <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80">Semaine {week} de Grossesse</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8 tracking-tighter">Votre bébé a la taille<br/>d'une mangue !</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">Terme Prévu</p>
                    <p className="text-sm font-bold">14 Août 2024</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">CPN Réalisées</p>
                    <p className="text-sm font-bold">03 / 08</p>
                  </div>
                  <div className="hidden md:block bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">Prochain RDV</p>
                    <p className="text-sm font-bold">Dans 4 jours</p>
                  </div>
                </div>
             </div>
             
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="absolute top-10 right-10 opacity-20"><Heart size={120} strokeWidth={1} /></div>
          </div>

          {/* Quick Search for centers */}
          <div className="mt-8 bg-white rounded-[32px] p-4 flex items-center border border-gray-100 shadow-sm focus-within:border-[#7BAE7F] transition-all">
             <MapPin size={24} className="text-[#7BAE7F] ml-4" />
             <input type="text" placeholder="Rechercher un centre de santé..." className="bg-transparent border-none outline-none text-sm font-bold w-full px-4 text-gray-600 placeholder:text-gray-300" />
             <button className="p-4 bg-gray-900 text-white rounded-2xl active:scale-95 transition-all"><Search size={20} /></button>
          </div>
        </section>

        {/* Sidebar widgets for Maman */}
        <section className="space-y-6">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
             <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><Sparkles size={20} /></div>
                <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest">Conseil du Jour</h3>
             </div>
             {loading ? (
               <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
               </div>
             ) : (
               <p className="text-sm text-gray-500 leading-relaxed font-medium italic">
                 « {tips[0]?.tip || "Prenez le temps de vous reposer aujourd'hui."} »
               </p>
             )}
          </div>

          <div className="bg-red-50 rounded-[40px] p-8 border border-red-100">
             <h3 className="font-black text-red-600 text-[10px] uppercase tracking-[0.2em] mb-4">Signes de Danger</h3>
             <ul className="space-y-3">
               {['Saignements', 'Maux de tête sévères', 'Fièvre'].map(sign => (
                 <li key={sign} className="flex items-center space-x-3 text-xs font-bold text-red-400">
                   <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                   <span>{sign}</span>
                 </li>
               ))}
             </ul>
             <button className="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-200">
               Appeler l'Urgence
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};
