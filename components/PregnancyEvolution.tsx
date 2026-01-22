
import React, { useState } from 'react';
import { ArrowLeft, Plus, Save, Activity, ShieldCheck, Thermometer, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { Patient, CPNVisit } from '../types';

interface PregnancyEvolutionProps {
  patient: Patient;
  onBack: () => void;
}

export const PregnancyEvolution: React.FC<PregnancyEvolutionProps> = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState<'evolution' | 'preventive'>('evolution');
  
  // Mock data based on the provided form images
  const [visits, setVisits] = useState<CPNVisit[]>([
    {
      id: 'v1',
      date: '2024-02-10',
      weight: 65,
      bp: '12/8',
      conjunctiva: 'colorées',
      fundalHeight: 24,
      fetalHeartRate: 142,
      fetalMovements: true,
      presentation: 'sommet',
      liquidLoss: 'non',
      albuminuria: '-',
      glycosuria: '-',
      treatments: ['Fer/Folate', 'MILD']
    },
    {
      id: 'v2',
      date: '2024-03-12',
      weight: 68,
      bp: '13/8',
      conjunctiva: 'colorées',
      fundalHeight: 28,
      fetalHeartRate: 138,
      fetalMovements: true,
      presentation: 'sommet',
      liquidLoss: 'non',
      albuminuria: '-',
      glycosuria: '-',
      treatments: ['Fer/Folate', 'SP1']
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAF7] pb-32 animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#7BAE7F] transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">Évolution de la Grossesse</h2>
              <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-1">{patient.name} • Semaine {patient.pregnancyWeek}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#7BAE7F] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#7BAE7F]/20 active:scale-95 transition-all">
            <Plus size={16} strokeWidth={3} />
            <span className="hidden md:inline">Nouvelle Visite</span>
          </button>
        </div>

        {/* Local Tabs */}
        <div className="max-w-7xl mx-auto flex gap-6 mt-8">
           <button 
            onClick={() => setActiveTab('evolution')}
            className={`text-[10px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'evolution' ? 'border-[#7BAE7F] text-[#7BAE7F]' : 'border-transparent text-gray-300'}`}
           >
             Suivi Clinique (Tableau)
           </button>
           <button 
            onClick={() => setActiveTab('preventive')}
            className={`text-[10px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'preventive' ? 'border-[#7BAE7F] text-[#7BAE7F]' : 'border-transparent text-gray-300'}`}
           >
             Mesures Préventives (V.A.T/SP)
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {activeTab === 'evolution' ? (
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header - Visible only on Desktop */}
            <div className="hidden lg:grid grid-cols-12 bg-gray-900 text-white p-6 text-[9px] font-black uppercase tracking-[0.2em]">
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Poids (Kg)</div>
              <div className="col-span-1">TA</div>
              <div className="col-span-1">Conj.</div>
              <div className="col-span-1">HU (cm)</div>
              <div className="col-span-1">BCF</div>
              <div className="col-span-1">Mvts</div>
              <div className="col-span-1">Prés.</div>
              <div className="col-span-1">Pertes</div>
              <div className="col-span-1">Alb/Gly</div>
              <div className="col-span-2 text-right">Traitements</div>
            </div>

            {/* Visit Rows */}
            <div className="divide-y divide-gray-50">
              {visits.map((v) => (
                <div key={v.id} className="grid grid-cols-1 lg:grid-cols-12 p-6 hover:bg-gray-50 transition-colors items-center gap-4 lg:gap-0">
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Date</span>
                    <p className="font-bold text-gray-900 text-sm">{v.date}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Poids</span>
                    <p className="font-bold text-gray-600 text-sm">{v.weight} kg</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">TA</span>
                    <p className={`font-black text-sm ${parseInt(v.bp) > 13 ? 'text-red-500' : 'text-gray-900'}`}>{v.bp}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Conj.</span>
                    <p className="text-xs font-bold text-gray-500">{v.conjunctiva}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">HU</span>
                    <p className="font-bold text-gray-900">{v.fundalHeight}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">BCF</span>
                    <p className={`font-black text-sm ${v.fetalHeartRate < 120 || v.fetalHeartRate > 160 ? 'text-red-500' : 'text-[#7BAE7F]'}`}>{v.fetalHeartRate}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Mvts</span>
                    <div className={`w-2 h-2 rounded-full ${v.fetalMovements ? 'bg-[#7BAE7F]' : 'bg-red-400'}`}></div>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Présent.</span>
                    <p className="text-[10px] font-black uppercase text-gray-400">{v.presentation}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Pertes</span>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{v.liquidLoss}</p>
                  </div>
                  <div className="col-span-1 flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[9px] font-black text-gray-300 uppercase tracking-widest">Alb/Gly</span>
                    <p className="text-[10px] font-bold text-gray-400">{v.albuminuria} / {v.glycosuria}</p>
                  </div>
                  <div className="col-span-2 flex lg:block items-center justify-end gap-2">
                    {v.treatments.map((t, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 bg-[#7BAE7F]/10 text-[#7BAE7F] text-[8px] font-black uppercase rounded-lg ml-1">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* V.A.T Vaccination Card */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><ShieldCheck size={24} /></div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Vaccination (V.A.T)</h3>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <div key={num} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <span className="text-xs font-black uppercase tracking-widest text-gray-400">Dose V.A.T {num}</span>
                       {num <= 2 ? (
                         <div className="flex items-center space-x-2 text-[#7BAE7F]">
                            <span className="text-[10px] font-black uppercase">Reçue</span>
                            <div className="w-6 h-6 bg-[#7BAE7F] text-white rounded-full flex items-center justify-center"><Plus size={14} /></div>
                         </div>
                       ) : (
                         <button className="text-[10px] font-black uppercase text-gray-300 hover:text-[#7BAE7F] transition-all">Enregistrer</button>
                       )}
                    </div>
                  ))}
               </div>
            </div>

            {/* Other Preventive Measures */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><Thermometer size={24} /></div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Autres Préventions</h3>
               </div>
               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-3">TPI (Paludisme - Sulfadoxine)</label>
                    <div className="flex gap-2">
                       {['SP1', 'SP2', 'SP3'].map(sp => (
                         <button key={sp} className={`flex-1 py-3 rounded-xl border font-black text-[10px] transition-all ${sp === 'SP1' ? 'bg-[#7BAE7F] border-[#7BAE7F] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-300'}`}>
                           {sp}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">MILD (Moustiquaire)</p>
                     <p className="text-sm font-bold text-gray-800">Distribuée le 10/02/2024</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Déparasitage (Mebendazole)</p>
                     <p className="text-sm font-bold text-gray-300 italic">Non encore administré</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
