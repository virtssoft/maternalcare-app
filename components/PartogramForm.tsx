
import React, { useState } from 'react';
import { ArrowLeft, Save, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle2, Activity, User, Clipboard, Baby, HeartPulse } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';

interface PartogramFormProps {
  onBack: () => void;
  patientName?: string;
}

export const PartogramForm: React.FC<PartogramFormProps> = ({ onBack, patientName = "Patiente" }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Admission
    nom: '', postnom: '', prenom: '', age: '',
    parite: '', gestite: '', ddr: '', dpa: '',
    // Phase Active Data for Graph
    monitoringData: [
      { heure: 0, dilatation: 4, bcf: 140, contractions: 2 },
      { heure: 2, dilatation: 6, bcf: 135, contractions: 3 },
      { heure: 4, dilatation: 8, bcf: 145, contractions: 4 },
    ]
  });

  const steps = [
    { id: 1, label: 'Admission', icon: User },
    { id: 2, label: 'Examens', icon: Clipboard },
    { id: 3, label: 'Phase Active', icon: Activity },
    { id: 4, label: 'Accouchement', icon: Baby },
    { id: 5, label: 'Post-partum', icon: HeartPulse },
  ];

  const renderStep1 = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <div className="p-2 bg-[#7BAE7F]/10 rounded-xl text-[#7BAE7F]"><User size={20} /></div>
          I. ADMISSION & IDENTITÉ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Nom</label>
            <input type="text" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none focus:border-[#7BAE7F] font-bold" placeholder="Nom de la patiente" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Post-nom</label>
            <input type="text" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none focus:border-[#7BAE7F] font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Âge</label>
            <input type="number" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none focus:border-[#7BAE7F] font-bold" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
           <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Parité</label>
            <input type="text" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none font-bold" placeholder="P..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Gestité</label>
            <input type="text" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none font-bold" placeholder="G..." />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">DDR (Dernière Règles)</label>
            <input type="date" className="w-full bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 outline-none font-bold" />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] flex items-start space-x-4">
        <AlertTriangle className="text-amber-500 shrink-0" size={24} />
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-700">Rappel Sérologique</p>
          <p className="text-xs text-amber-600 mt-1 font-medium">Si le statut VIH est inconnu et dilatation non complète, faire le Counselling et un Test Rapide immédiatement.</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Suivi Graphique du Travail</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Ligne d'alerte & d'action</p>
          </div>
          <button className="bg-[#7BAE7F] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#7BAE7F]/20">
            Ajouter un relevé
          </button>
        </div>

        {/* Partogram Graph Component */}
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formData.monitoringData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BAE7F" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#7BAE7F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0f0f0" />
              <XAxis 
                dataKey="heure" 
                label={{ value: 'Temps (heures)', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 'black', fill: '#ccc' }} 
                type="number"
                domain={[0, 14]}
              />
              <YAxis 
                domain={[4, 10]} 
                ticks={[4, 5, 6, 7, 8, 9, 10]}
                label={{ value: 'Dilatation (cm)', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 'black', fill: '#ccc' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
              />
              
              {/* Ligne d'alerte (Vert) - Commence à 4cm à H0, finit à 10cm à H6 */}
              <ReferenceLine segment={[{ x: 0, y: 4 }, { x: 6, y: 10 }]} stroke="#7BAE7F" strokeWidth={3} strokeDasharray="5 5" label={{ position: 'top', value: 'ALERTE', fontSize: 10, fill: '#7BAE7F', fontWeight: 'black' }} />
              
              {/* Ligne d'action (Orange/Rouge) - Décalée de 4h */}
              <ReferenceLine segment={[{ x: 4, y: 4 }, { x: 10, y: 10 }]} stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" label={{ position: 'top', value: 'ACTION', fontSize: 10, fill: '#f59e0b', fontWeight: 'black' }} />
              
              <Area 
                type="monotone" 
                dataKey="dilatation" 
                stroke="#7BAE7F" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorDil)" 
                dot={{ r: 6, fill: '#7BAE7F', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
           <div className="bg-[#F8FAF7] p-5 rounded-3xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dernier BCF</p>
              <p className="text-2xl font-black text-[#7BAE7F]">135 <span className="text-[10px]">bpm</span></p>
           </div>
           <div className="bg-[#F8FAF7] p-5 rounded-3xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contractions</p>
              <p className="text-2xl font-black text-gray-800">03 / 10'</p>
           </div>
           <div className="bg-[#F8FAF7] p-5 rounded-3xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Poche des Eaux</p>
              <p className="text-xs font-black text-blue-500 uppercase">Intacte</p>
           </div>
           <div className="bg-[#F8FAF7] p-5 rounded-3xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Engagement</p>
              <p className="text-xs font-black text-gray-800 uppercase">Amorcé (A)</p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF7] pb-32">
      {/* Navbar Partogramme */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 hover:bg-gray-50 rounded-2xl text-gray-400 transition-all">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight leading-none uppercase">Partogramme Numérique</h2>
              <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-1">Dossier: {patientName}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all">
            <Save size={16} />
            <span>Enregistrer</span>
          </button>
        </div>

        {/* Stepper Pro */}
        <div className="max-w-4xl mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[500px]">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <button 
                  onClick={() => setStep(s.id)}
                  className={`flex flex-col items-center gap-2 transition-all ${step === s.id ? 'scale-110' : 'opacity-40'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${step === s.id ? 'bg-[#7BAE7F] text-white shadow-lg shadow-[#7BAE7F]/30' : 'bg-white border border-gray-100 text-gray-400'}`}>
                    <s.icon size={20} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{s.label}</span>
                </button>
                {i < steps.length - 1 && <div className="h-[2px] w-8 bg-gray-100 rounded-full mx-2" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        {step === 1 && renderStep1()}
        {step === 3 && renderStep3()}
        
        {step !== 1 && step !== 3 && (
           <div className="bg-white p-20 rounded-[48px] text-center border border-gray-100 flex flex-col items-center opacity-50">
              <Clipboard size={64} className="text-gray-200 mb-6" />
              <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">Section {steps.find(s => s.id === step)?.label}</h3>
              <p className="text-sm font-bold text-gray-300 mt-2">Formulaire détaillé en cours de déploiement</p>
           </div>
        )}

        {/* Sticky Footer Navigation */}
        <div className="max-w-5xl mx-auto fixed bottom-32 left-6 right-6 lg:left-[300px] flex justify-between z-40 pointer-events-none">
           <button 
            disabled={step === 1}
            onClick={() => setStep(prev => prev - 1)}
            className={`pointer-events-auto p-5 bg-white border border-gray-100 rounded-[24px] text-gray-400 shadow-2xl active:scale-90 transition-all ${step === 1 ? 'opacity-0' : 'opacity-100'}`}
           >
             <ChevronLeft size={24} />
           </button>
           <button 
            disabled={step === steps.length}
            onClick={() => setStep(prev => prev + 1)}
            className={`pointer-events-auto p-5 bg-white border border-gray-100 rounded-[24px] text-[#7BAE7F] shadow-2xl active:scale-90 transition-all ${step === steps.length ? 'opacity-0' : 'opacity-100'}`}
           >
             <ChevronRight size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};
