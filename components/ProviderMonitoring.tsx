
import React, { useState } from 'react';
import { Search, Filter, User, ChevronRight, AlertCircle, Plus, Activity } from 'lucide-react';
import { MOCK_PATIENTS } from '../constants';
import { Patient } from '../types';

interface ProviderMonitoringProps {
  onSelectPatient: (patient: Patient) => void;
  onStartPartogram: (patient: Patient) => void;
}

export const ProviderMonitoring: React.FC<ProviderMonitoringProps> = ({ onSelectPatient, onStartPartogram }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 pb-24 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">File Active</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Gestion des patientes en cours</p>
        </div>
        <button className="p-4 bg-[#7BAE7F] text-white rounded-2xl shadow-xl shadow-[#7BAE7F]/20 hover:bg-[#6A9A6E] transition-all active:scale-95">
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7BAE7F] transition-colors" size={20} />
        <input
          type="text"
          placeholder="Rechercher par nom ou numéro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-3xl py-5 pl-14 pr-6 shadow-sm outline-none focus:ring-4 focus:ring-[#7BAE7F]/5 focus:border-[#7BAE7F] transition-all font-bold text-gray-700 placeholder:text-gray-200"
        />
      </div>

      {/* Risk Summary Filter */}
      <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
        {['Tous', 'Urgent', 'Accouchement', 'Suivi Normal'].map((tag, i) => (
          <button 
            key={tag}
            className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              i === 0 ? 'bg-gray-900 border-gray-900 text-white shadow-xl shadow-black/10' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Patient List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="w-full bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col hover:border-[#7BAE7F]/30 transition-all group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative shrink-0">
                <img src={patient.photo} alt={patient.name} className="w-16 h-16 rounded-[20px] object-cover shadow-md" />
                {patient.riskLevel === 'high' && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white ring-2 ring-red-100">
                    <AlertCircle size={10} />
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-black text-gray-900 text-lg truncate">{patient.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] text-gray-300 font-bold uppercase">Semaine {patient.pregnancyWeek}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${patient.riskLevel === 'high' ? 'text-red-500' : 'text-[#7BAE7F]'}`}>
                    Risque {patient.riskLevel === 'high' ? 'Élevé' : 'Faible'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <button 
                onClick={() => onSelectPatient(patient)}
                className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
               >
                 <span>Voir Dossier</span>
               </button>
               <button 
                onClick={() => onStartPartogram(patient)}
                className="flex items-center justify-center space-x-2 bg-[#7BAE7F]/10 text-[#7BAE7F] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#7BAE7F] hover:text-white transition-all shadow-sm"
               >
                 <Activity size={14} strokeWidth={3} />
                 <span>Partogramme</span>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
