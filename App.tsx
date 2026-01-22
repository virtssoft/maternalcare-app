
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
    const timer = setTimeout(() => setAppState('portal-selection'), 2000);
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
          if (selectedPortal === 'DPS' && userFound.role !== UserRole.ADMIN_DPS) userFound = null;
          if (selectedPortal === 'ZONE' && ![UserRole.ADMIN_ZONE, UserRole.PERSONNEL_ZONE].includes(userFound.role)) userFound = null;
          if (selectedPortal === 'AIRE' && ![UserRole.ADMIN_AIRE, UserRole.PERSONNEL_AIRE].includes(userFound.role)) userFound = null;
        }
      }

      if (userFound) {
        setCurrentUser(userFound as unknown as User);
        setAppState('authenticated');
        setActiveTab('home');
      } else {
        setError("Identifiants incorrects ou portail non autorisé.");
      }
      setIsLoading(false);
    }, 1000);
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
        <div className="relative mb-10">
           <div className="absolute inset-0 bg-[#7BAE7F]/20 blur-[60px] rounded-full animate-pulse"></div>
           <div className="relative w-32 h-32 bg-[#7BAE7F] rounded-[40px] flex items-center justify-center shadow-2xl animate-bounce">
              <div className="relative">
                <Heart size={64} className="text-white opacity-20" />
                <Baby size={48} className="text-white absolute inset-0 m-auto" />
              </div>
           </div>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">MaternalCare+</h1>
        <p className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-[0.4em]">Comfort ASBL • Nord-Kivu</p>
      </div>
    );
  }

  if (appState === 'portal-selection') {
    return (
      <div className="min-h-screen bg-[#F8FAF7] p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
           <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#7BAE7F] rounded-2xl flex items-center justify-center text-white shadow-lg">
                   <Baby size={24} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Portails d'accès</h1>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Veuillez choisir votre structure.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { id: 'DPS', title: 'DPS / COMFORT', icon: Shield, color: 'bg-gray-900' },
               { id: 'ZONE', title: 'Zone de Santé', icon: Building2, color: 'bg-blue-600' },
               { id: 'AIRE', title: 'Aire de Santé', icon: Activity, color: 'bg-[#7BAE7F]' },
               { id: 'COMMUNITY', title: 'Communauté', icon: Users, color: 'bg-rose-500' },
             ].map((p) => (
               <button 
                key={p.id}
                onClick={() => { setSelectedPortal(p.id as PortalType); setAppState('login'); }}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all text-left flex items-center gap-6 active:scale-95"
               >
                 <div className={`w-16 h-16 rounded-2xl ${p.color} text-white flex items-center justify-center shrink-0`}>
                    <p.icon size={28} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{p.title}</h3>
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
            className="flex items-center gap-3 text-gray-400 mb-10"
           >
              <ArrowLeft size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Retour</span>
           </button>

           <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-8">Identification</h2>

           <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-3xl flex items-center gap-4 text-red-500 mb-6">
                   <AlertCircle size={24} />
                   <p className="text-[10px] font-black uppercase">{error}</p>
                </div>
              )}

              {(selectedPortal === 'ZONE' || selectedPortal === 'AIRE') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Zone de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none font-bold text-gray-700 appearance-none"
                    value={selectedZone}
                    onChange={(e) => { setSelectedZone(e.target.value); setSelectedFacility(''); }}
                  >
                    <option value="">-- Sélectionner Zone --</option>
                    {ZONES_SANTE.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              )}

              {selectedPortal === 'AIRE' && selectedZone && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Aire de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none font-bold text-gray-700 appearance-none"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                  >
                    <option value="">-- Sélectionner l'Aire --</option>
                    {AIRES_BY_ZONE[selectedZone]?.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">
                  {selectedPortal === 'COMMUNITY' ? 'Téléphone' : 'ID Agent'}
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none font-black text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Code PIN</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none font-black text-gray-800 tracking-[1em] text-center"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 rounded-3xl font-black text-xs uppercase tracking-widest text-white shadow-2xl bg-[#7BAE7F]"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin mx-auto" /> : <span>Se connecter</span>}
              </button>
           </form>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  if (isViewingPartogram) {
    return <PartogramForm onBack={() => setIsViewingPartogram(false)} patientName={selectedPatient?.name} />;
  }

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
        <header className="lg:hidden px-6 py-6 flex justify-between items-center bg-white border-b border-gray-50 sticky top-0 z-30">
          <button onClick={() => setIsDrawerOpen(true)} className="p-3 text-gray-400">
            <Shield size={20} />
          </button>
          <span className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-[0.3em]">MaternalCare+</span>
          <img src={currentUser.avatar} className="w-10 h-10 rounded-xl" alt="Profil" />
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
