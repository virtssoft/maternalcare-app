
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Phone, Calendar, MapPin, Activity, ShieldAlert, FileText, ChevronRight, Stethoscope, Sparkles, TrendingUp } from 'lucide-react';
import { getClinicalInsight } from '../services/geminiService';
import { Patient } from '../types';
import { PregnancyEvolution } from './PregnancyEvolution';

interface ProviderPatientFileProps {
  patient: Patient;
  onBack: () => void;
}

export const ProviderPatientFile: React.FC<ProviderPatientFileProps> = ({ patient, onBack }) => {
  const [insight, setInsight] = useState<string>('Analyse clinique en cours...');
  const [view, setView] = useState<'profile' | 'evolution'>('profile');

  useEffect(() => {
    getClinicalInsight({
      name: patient.name,
      week: patient.pregnancyWeek,
      bp: "12/8",
      risk: patient.riskLevel
    }).then(setInsight);
  }, [patient]);

  if (view === 'evolution') {
    return <PregnancyEvolution patient={patient} onBack={() => setView('profile')} />;
  }

  return (
    <div className="bg-[#F8FAF7] min-h-screen pb-24 animate-in slide-in-from-right duration-300">
      {/* Patient Header Card */}
      <div className="bg-white px-6 pt-6 pb-8 shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <button onClick={onBack} className="mb-6 p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#7BAE7F] transition-all">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <img src={patient.photo} alt={patient.name} className="w-32 h-32 rounded-[40px] object-cover border-4 border-white shadow-2xl shrink-0" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">{patient.name}</h1>
                <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                  patient.riskLevel === 'high' ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-[#7BAE7F] text-white shadow-lg shadow-[#7BAE7F]/20'
                }`}>
                  Risque {patient.riskLevel === 'high' ? 'Élevé' : 'Normal'}
                </div>
              </div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{patient.age} ans • Province du Nord-Kivu</p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="p-4 bg-[#7BAE7F]/10 text-[#7BAE7F] rounded-2xl hover:bg-[#7BAE7F] hover:text-white transition-all">
                  <Phone size={20} />
                </button>
                <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
                  <Calendar size={20} />
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl">
                  Nouvelle Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        {/* IA Insight */}
        <div className="mb-8">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-[#7BAE7F]/10 rounded-xl text-[#7BAE7F]">
                  <Sparkles size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7BAE7F]">Analyse Clinique IA</span>
              </div>
              <p className="text-xl font-bold leading-relaxed italic text-gray-800">
                "{insight}"
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Stethoscope size={200} />
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button 
            onClick={() => setView('evolution')}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-left group hover:border-[#7BAE7F] transition-all"
          >
            <div className="w-16 h-16 rounded-[24px] bg-[#7BAE7F]/10 text-[#7BAE7F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Suivi CPN</h3>
            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Évolution de la grossesse</p>
            <div className="mt-8 flex items-center text-[#7BAE7F] font-black text-[10px] uppercase tracking-widest gap-2">
              <span>Voir les détails</span>
              <ChevronRight size={14} />
            </div>
          </button>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <div className="w-16 h-16 rounded-[24px] bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
                <FileText size={32} />
             </div>
             <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Examens</h3>
             <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Biologie & Paraclinique</p>
             <div className="mt-8 space-y-2">
                <p className="text-xs font-bold text-gray-600">GS: O+ • HIV: Négatif</p>
                <p className="text-xs font-bold text-gray-600">Hb: 12.4 g/dL</p>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <div className="w-16 h-16 rounded-[24px] bg-orange-50 text-orange-500 flex items-center justify-center mb-6">
                <Activity size={32} />
             </div>
             <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">Antécédents</h3>
             <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Gynéco-Obstétricaux</p>
             <div className="mt-8 space-y-2">
                <p className="text-xs font-bold text-gray-600">G3 P2 A0</p>
                <p className="text-xs font-bold text-gray-600">2 Enfants vivants</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
