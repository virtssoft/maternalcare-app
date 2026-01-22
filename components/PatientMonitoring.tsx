
import React, { useState } from 'react';
import { ClipboardCheck, Activity, Thermometer, Info, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeSymptoms } from '../services/geminiService';

const SYMPTOMS_LIST = [
  "Nausées", "Fatigue", "Maux de dos", "Maux de tête", 
  "Crampes", "Gonflements", "Brûlures d'estomac", "Insomnie"
];

const MILESTONES = [
  { week: 12, label: "Échographie T1", done: true },
  { week: 16, label: "Consultation CPN 2", done: true },
  { week: 22, label: "Échographie T2", done: false },
  { week: 24, label: "Test Diabète", done: false },
  { week: 28, label: "Consultation CPN 3", done: false },
];

export const PatientMonitoring: React.FC<{ week: number }> = ({ week }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    const feedback = await analyzeSymptoms(selectedSymptoms, week);
    setAiFeedback(feedback || "Erreur d'analyse.");
    setIsAnalyzing(false);
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-gray-800">Mon Suivi</h1>

      {/* Symptoms Logger */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="text-rose-500" size={20} />
          <h2 className="font-bold text-gray-800">Comment vous sentez-vous ?</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {SYMPTOMS_LIST.map(s => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedSymptoms.includes(s) 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="w-full bg-rose-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.98] transition-transform"
        >
          {isAnalyzing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={18} />
              <span>Analyser avec l'IA</span>
            </>
          )}
        </button>

        {aiFeedback && (
          <div className="mt-4 p-4 bg-rose-50 rounded-2xl border border-rose-100 animate-in slide-in-from-top">
            <div className="flex items-start space-x-3">
              <Info className="text-rose-500 mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm text-gray-700 italic">"{aiFeedback}"</p>
            </div>
          </div>
        )}
      </section>

      {/* Progress Timeline */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <ClipboardCheck className="text-rose-500" size={20} />
          <h2 className="font-bold text-gray-800">Calendrier de Suivi</h2>
        </div>

        <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
          {MILESTONES.map((m, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                m.done ? 'bg-green-500' : (m.week <= week ? 'bg-rose-500' : 'bg-gray-200')
              }`}>
                {m.done && <CheckCircle2 size={12} className="text-white" />}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className={`text-sm font-bold ${m.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {m.label}
                  </h4>
                  <p className="text-xs text-gray-500">Semaine {m.week}</p>
                </div>
                {!m.done && m.week <= week && (
                  <span className="flex items-center text-[10px] font-bold text-amber-500 uppercase">
                    <AlertCircle size={10} className="mr-1" /> En retard
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Folder Shortcut */}
      <div className="bg-gray-900 rounded-3xl p-5 text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-xl">
             <Thermometer size={20} className="text-rose-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Carnet de santé</p>
            <p className="text-sm font-bold">Consulter mon dossier complet</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
            <CheckCircle2 size={16} />
        </div>
      </div>
    </div>
  );
};
