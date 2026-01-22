
import React from 'react';
import { ArrowLeft, Play, BookOpen, Heart, Sparkles, Search, ChevronRight } from 'lucide-react';

export const EducationView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const categories = ['Tout', 'Nutrition', 'Accouchement', 'Bien-être', 'Post-partum'];
  const resources = [
    { title: "L'alimentation au 1er trimestre", type: 'Article', time: '5 min', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400', color: 'bg-green-50' },
    { title: "Préparer son sac pour la maternité", type: 'Vidéo', time: '12 min', img: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=400', color: 'bg-blue-50' },
    { title: "Signes précurseurs du travail", type: 'Guide', time: '8 min', img: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=400', color: 'bg-orange-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF7] pb-32 animate-in slide-in-from-right duration-500">
      <div className="bg-white border-b border-gray-100 px-6 py-8 mb-8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <button onClick={onBack} className="p-4 bg-gray-50 rounded-2xl text-gray-400"><ArrowLeft size={20} /></button>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Bibliothèque Santé</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button key={i} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">À la une</h3>
            <Sparkles className="text-amber-500" size={24} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, i) => (
              <div key={i} className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm group cursor-pointer hover:border-[#7BAE7F] transition-all">
                <div className="h-48 relative">
                  <img src={res.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={res.title} />
                  <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest">{res.type}</div>
                  {res.type === 'Vidéo' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-14 h-14 bg-[#7BAE7F] text-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                          <Play size={24} fill="white" />
                       </div>
                    </div>
                  )}
                </div>
                <div className="p-8">
                   <h4 className="font-black text-gray-900 text-lg leading-tight mb-4">{res.title}</h4>
                   <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {res.time}</span>
                      <span className="flex items-center gap-1 text-[#7BAE7F]"><Heart size={12} /> 124 J'aime</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 rounded-[48px] p-10 text-white relative overflow-hidden">
           <div className="relative z-10 max-w-lg">
              <h3 className="text-3xl font-black mb-4 leading-tight">Accédez à des conseils personnalisés</h3>
              <p className="text-white/60 text-sm mb-8">Posez vos questions à notre assistant intelligent disponible 24h/24 pour vous rassurer.</p>
              <button className="bg-[#7BAE7F] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#7BAE7F]/20">Démarrer une discussion</button>
           </div>
           <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#7BAE7F]/20 rounded-full blur-[100px]"></div>
        </section>
      </div>
    </div>
  );
};
