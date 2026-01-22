
import React, { useState, useEffect } from 'react';
import { User, UserRole, NavTab, Patient, PortalType } from './types';
import { MOCK_USERS, ZONES_SANTE, AIRES_BY_ZONE } from './constants';
import { BottomNav, DesktopSidebar, SideDrawer } from './components/Navigation';
import { ProviderHome } from './components/ProviderHome';
import { PatientHome } from './components/PatientHome';
import { PatientMonitoring } from './components/PatientMonitoring';
import { ProviderMonitoring } from './components/ProviderMonitoring';
import { ProviderPatientFile } from './components/ProviderPatientFile';
import { PartogramForm } from './components/PartogramForm';
import { AlertsView } from './components/AlertsView';
import { SettingsView } from './components/SettingsView';
import { EducationView } from './components/EducationView';
import { AfyaBot } from './components/AfyaBot';
import { ReferralSystem } from './components/ReferralSystem';
import { StatsView } from './components/StatsView';
import { AdminPanel } from './components/AdminPanel';
import { Heart, Baby, Shield, Activity, Users, Building2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'loading' | 'portal-selection' | 'login' | 'authenticated'>('loading');
  const [selectedPortal, setSelectedPortal] = useState<PortalType>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isViewingPartogram, setIsViewingPartogram] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppState('portal-selection'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      let userFound = null;
      if (selectedPortal === 'COMMUNITY') {
        userFound = MOCK_USERS.find(u => u.phone === loginId && u.pin === loginPin);
      } else {
        userFound = MOCK_USERS.find(u => u.agentId === loginId && u.pin === loginPin);
        
        if (userFound) {
          const role = userFound.role;
          if (selectedPortal === 'DPS' && role !== UserRole.ADMIN_DPS) userFound = null;
          if (selectedPortal === 'ZONE' && ![UserRole.ADMIN_ZONE, UserRole.PERSONNEL_ZONE].includes(role)) userFound = null;
          if (selectedPortal === 'AIRE' && ![UserRole.ADMIN_AIRE, UserRole.PERSONNEL_AIRE].includes(role)) userFound = null;
        }
      }

      if (userFound) {
        setCurrentUser(userFound as unknown as User);
        setAppState('authenticated');
        setActiveTab('home');
      } else {
        setError("Identifiants ou portail incorrects.");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('portal-selection');
    setSelectedPortal(null);
    setLoginId('');
    setLoginPin('');
    setSelectedZone('');
    setSelectedFacility('');
  };

  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-[#7BAE7F]/20 blur-[60px] rounded-full animate-pulse"></div>
           <div className="relative w-28 h-28 bg-[#7BAE7F] rounded-[32px] flex items-center justify-center shadow-2xl animate-bounce">
              <Baby size={48} className="text-white" />
           </div>
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">MaternalCare+</h1>
        <p className="text-[9px] font-black text-[#7BAE7F] uppercase tracking-[0.3em] mt-2">Édition Comfort ASBL</p>
      </div>
    );
  }

  if (appState === 'portal-selection') {
    const configs = [
      { id: 'DPS', title: 'DPS / COMFORT', icon: Shield, color: 'bg-gray-900' },
      { id: 'ZONE', title: 'Zone de Santé', icon: Building2, color: 'bg-blue-600' },
      { id: 'AIRE', title: 'Aire de Santé', icon: Activity, color: 'bg-[#7BAE7F]' },
      { id: 'COMMUNITY', title: 'Communauté', icon: Users, color: 'bg-rose-500' },
    ];
    return (
      <div className="min-h-screen bg-[#F8FAF7] p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
           <div className="text-center mb-12">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">Choisir un portail d'accès</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Identification requise selon votre structure.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {configs.map((p) => (
               <button 
                key={p.id}
                onClick={() => { setSelectedPortal(p.id as PortalType); setAppState('login'); }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all text-left flex items-center gap-6 active:scale-95 group"
               >
                 <div className={`w-14 h-14 rounded-2xl ${p.color} text-white flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform`}>
                    <p.icon size={24} />
                 </div>
                 <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{p.title}</h3>
               </button>
             ))}
           </div>
        </div>
      </div>
    );
  }

  if (appState === 'login') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
           <button 
            onClick={() => { setAppState('portal-selection'); setSelectedZone(''); setSelectedFacility(''); setError(null); }}
            className="flex items-center gap-3 text-gray-400 mb-8 hover:text-gray-900 transition-colors"
           >
              <ArrowLeft size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Retour</span>
           </button>

           <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1">Connexion</h2>
           <p className="text-[9px] font-black text-[#7BAE7F] uppercase tracking-widest mb-8">Portail {selectedPortal}</p>

           <form className="space-y-5" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-500 animate-in slide-in-from-top">
                   <AlertCircle size={18} />
                   <p className="text-[10px] font-bold uppercase">{error}</p>
                </div>
              )}

              {(selectedPortal === 'ZONE' || selectedPortal === 'AIRE') && (
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">Zone de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none font-bold text-gray-700 cursor-pointer"
                    value={selectedZone}
                    onChange={(e) => { setSelectedZone(e.target.value); setSelectedFacility(''); }}
                  >
                    <option value="">-- Choisir la Zone --</option>
                    {ZONES_SANTE.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              )}

              {selectedPortal === 'AIRE' && selectedZone && (
                <div className="space-y-1 animate-in slide-in-from-top">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">Aire de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none font-bold text-gray-700 cursor-pointer"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                  >
                    <option value="">-- Choisir l'Aire --</option>
                    {AIRES_BY_ZONE[selectedZone]?.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">
                  {selectedPortal === 'COMMUNITY' ? 'Téléphone' : 'ID Agent'}
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none font-black text-gray-800"
                  placeholder={selectedPortal === 'COMMUNITY' ? '099XXXXXXX' : 'ID-XXX'}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">Code PIN</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none font-black text-gray-800 tracking-[0.5em] text-center"
                  placeholder="••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl bg-[#7BAE7F] hover:bg-[#6A9A6E] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <span>Valider l'accès</span>}
              </button>
           </form>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col lg:flex-row relative overflow-hidden">
      <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} role={currentUser.role} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} role={currentUser.role} />
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onLogout={handleLogout} 
        userName={currentUser.name} 
        userRole={currentUser.role}
        onNavigate={(tab) => { setActiveTab(tab); setIsDrawerOpen(false); }}
      />

      <div className="flex-1 flex flex-col lg:ml-[280px] min-h-screen">
        <header className="lg:hidden px-6 py-4 flex justify-between items-center bg-white border-b border-gray-50 sticky top-0 z-30">
          <button onClick={() => setIsDrawerOpen(true)} className="p-2 text-gray-400">
            <Shield size={20} />
          </button>
          <span className="text-[9px] font-black text-[#7BAE7F] uppercase tracking-[0.3em]">MaternalCare+</span>
          <img src={currentUser.avatar} className="w-8 h-8 rounded-lg border border-gray-100" alt="Profil" />
        </header>

        <main className="flex-1 overflow-y-auto page-transition pb-24 lg:pb-10">
          {activeTab === 'home' && (
            currentUser.role === UserRole.FEMME_ENCEINTE 
            ? <PatientHome week={currentUser.pregnancyWeek || 24} /> 
            : <ProviderHome role={currentUser.role} />
          )}
          
          {activeTab === 'monitoring' && (
            currentUser.role === UserRole.FEMME_ENCEINTE 
            ? <PatientMonitoring week={currentUser.pregnancyWeek || 24} /> 
            : (selectedPatient ? <ProviderPatientFile patient={selectedPatient} onBack={() => setSelectedPatient(null)} /> : <ProviderMonitoring onSelectPatient={setSelectedPatient} onStartPartogram={(p) => {setSelectedPatient(p); setIsViewingPartogram(true);}} />)
          )}
          
          {activeTab === 'afyabot' && <AfyaBot onBack={() => setActiveTab('home')} />}
          {activeTab === 'referral' && <ReferralSystem />}
          {activeTab === 'stats' && <StatsView />}
          {activeTab === 'alerts' && <AlertsView role={currentUser.role} />}
          {activeTab === 'admin' && <AdminPanel user={currentUser} />}
          {['settings', 'language', 'privacy'].includes(activeTab) && <SettingsView type={activeTab as any} onBack={() => setActiveTab('home')} />}
          {activeTab === 'help' && <EducationView onBack={() => setActiveTab('home')} />}
        </main>
      </div>
    </div>
  );
};

export default App;
