
import React, { useState } from 'react';
import { ArrowLeft, Globe, Lock, Bell, User, ChevronRight, Check, ShieldCheck, Moon, Laptop } from 'lucide-react';

interface SettingsViewProps {
  type: 'settings' | 'language' | 'privacy';
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ type, onBack }) => {
  const [selectedLang, setSelectedLang] = useState('Français');

  const languages = [
    { name: 'Français', sub: 'Langue officielle' },
    { name: 'Lingala', sub: 'Kinshasa & Ouest' },
    { name: 'Swahili', sub: 'Est & Sud' },
    { name: 'Kikongo', sub: 'Kongo Central' },
    { name: 'Tshiluba', sub: 'Grand Kasaï' },
  ];

  const renderLanguage = () => (
    <div className="space-y-4">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-6">Choisissez votre langue de confort</p>
      {languages.map((lang) => (
        <button
          key={lang.name}
          onClick={() => setSelectedLang(lang.name)}
          className={`w-full p-6 rounded-[32px] border flex items-center justify-between transition-all ${
            selectedLang === lang.name ? 'bg-white border-[#7BAE7F] shadow-xl shadow-[#7BAE7F]/10' : 'bg-white border-gray-100 opacity-60'
          }`}
        >
          <div className="text-left">
            <p className="font-black text-gray-900">{lang.name}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{lang.sub}</p>
          </div>
          {selectedLang === lang.name && <div className="p-2 bg-[#7BAE7F] text-white rounded-full"><Check size={16} strokeWidth={4} /></div>}
        </button>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-[40px] p-2 border border-gray-100 shadow-sm">
        {[
          { icon: User, label: 'Éditer le profil', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: Bell, label: 'Notifications Push', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: Moon, label: 'Mode Sombre', color: 'text-purple-500', bg: 'bg-purple-50', toggle: true },
        ].map((item, i) => (
          <div key={i} className={`flex items-center justify-between p-6 ${i !== 2 ? 'border-b border-gray-50' : ''}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}><item.icon size={20} /></div>
              <span className="font-bold text-gray-800">{item.label}</span>
            </div>
            {item.toggle ? (
              <div className="w-12 h-6 bg-gray-100 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            ) : <ChevronRight size={18} className="text-gray-300" />}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-[#7BAE7F] rounded-[40px] p-8 text-white relative overflow-hidden">
        <ShieldCheck size={80} className="absolute -right-4 -bottom-4 opacity-20" />
        <h3 className="text-2xl font-black mb-2">Vos données sont protégées</h3>
        <p className="text-sm font-medium opacity-80 leading-relaxed">
          MaternalCare+ utilise un chiffrement de bout en bout conforme aux normes de santé pour garantir que seuls vous et votre prestataire accédez à vos informations.
        </p>
      </div>
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 space-y-6">
        <div>
          <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-4">Consentement éclairé</h4>
          <p className="text-sm text-gray-500 leading-relaxed">En utilisant cette application, vous acceptez le partage de vos données biométriques avec les structures de santé partenaires pour un meilleur suivi de votre grossesse.</p>
        </div>
        <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Voir le contrat complet</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF7] pb-32 animate-in slide-in-from-right duration-500">
      <div className="bg-white border-b border-gray-100 px-6 py-8 mb-8 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#7BAE7F] transition-all"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
              {type === 'settings' ? 'Paramètres' : type === 'language' ? 'Langue' : 'Confidentialité'}
            </h2>
            <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-widest mt-1">Personnalisation de l'expérience</p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6">
        {type === 'language' && renderLanguage()}
        {type === 'settings' && renderSettings()}
        {type === 'privacy' && renderPrivacy()}
      </div>
    </div>
  );
};
