
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
      let user;
      if (selectedPortal === 'COMMUNITY') {
        user = MOCK_USERS.find(u => u.phone === loginId && u.pin === loginPin);
      } else {
        user = MOCK_USERS.find(u => u.agentId === loginId && u.pin === loginPin);
        
        // Validation stricte par portail pour le test
        if (user) {
          if (selectedPortal === 'DPS' && user.role !== UserRole.ADMIN_DPS) user = null;
          if (selectedPortal === 'ZONE' && ![UserRole.ADMIN_ZONE, UserRole.PERSONNEL_ZONE].includes(user.role)) user = null;
          if (selectedPortal === 'AIRE' && ![UserRole.ADMIN_AIRE, UserRole.PERSONNEL_AIRE].includes(user.role)) user = null;
        }
      }

      if (user) {
        setCurrentUser(user as unknown as User);
        setAppState('authenticated');
        setActiveTab('home');
      } else {
        setError("Identifiants ou sélection incorrects.");
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

  const handleStartPartogram = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewingPartogram(true);
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
        <div className="mt-12 flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin" size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Initialisation...</span>
        </div>
      </div>
    );
  }

  if (appState === 'portal-selection') {
    const portals = [
      { id: 'DPS' as PortalType, title: 'DPS / COMFORT', sub: 'Supervision Provinciale', icon: Shield, color: 'bg-gray-900' },
      { id: 'ZONE' as PortalType, title: 'Zone de Santé', sub: 'Gestion Territoriale', icon: Building2, color: 'bg-blue-600' },
      { id: 'AIRE' as PortalType, title: 'Aire de Santé', icon: Activity, sub: 'Personnel Médical', color: 'bg-[#7BAE7F]' },
      { id: 'COMMUNITY' as PortalType, title: 'Communauté', icon: Users, sub: 'Femmes Enceintes', color: 'bg-rose-500' },
    ];

    return (
      <div className="min-h-screen bg-[#F8FAF7] p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
           <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#7BAE7F] rounded-2xl flex items-center justify-center text-white shadow-lg">
                   <Baby size={24} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Bienvenue</h1>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Choisissez votre portail pour accéder aux services.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {portals.map((p) => (
               <button 
                key={p.id}
                onClick={() => { setSelectedPortal(p.id); setAppState('login'); }}
                className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#7BAE7F]/20 transition-all text-left group flex items-center gap-8 active:scale-95"
               >
                 <div className={`w-20 h-20 rounded-[32px] ${p.color} text-white flex items-center justify-center shrink-0 shadow-xl group-hover:rotate-6 transition-transform`}>
                    <p.icon size={36} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none mb-1">{p.title}</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.sub}</p>
                 </div>
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
            onClick={() => { setAppState('portal-selection'); setSelectedZone(''); setSelectedFacility(''); }}
            className="flex items-center gap-3 text-gray-400 hover:text-gray-900 transition-colors mb-10 group"
           >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Retour au menu</span>
           </button>

           <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">Connexion</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Portail {selectedPortal}
              </p>
           </div>

           <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-3xl flex items-center gap-4 text-red-500 mb-6 animate-in slide-in-from-top">
                   <AlertCircle size={24} />
                   <p className="text-[10px] font-black uppercase leading-tight">{error}</p>
                </div>
              )}

              {/* Sélection Zone pour ZONE ou AIRE */}
              {(selectedPortal === 'ZONE' || selectedPortal === 'AIRE') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Zone de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none focus:border-blue-500 font-bold text-gray-700 appearance-none"
                    value={selectedZone}
                    onChange={(e) => { setSelectedZone(e.target.value); setSelectedFacility(''); }}
                  >
                    <option value="">Choisir la zone...</option>
                    {ZONES_SANTE.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
              )}

              {/* Sélection Aire si une zone est choisie et portail AIRE */}
              {selectedPortal === 'AIRE' && selectedZone && (
                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Aire de Santé</label>
                  <select 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none focus:border-[#7BAE7F] font-bold text-gray-700 appearance-none"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                  >
                    <option value="">Choisir l'aire...</option>
                    {AIRES_BY_ZONE[selectedZone]?.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">
                  {selectedPortal === 'COMMUNITY' ? 'Numéro de Téléphone' : 'ID Agent'}
                </label>
                <input
                  type={selectedPortal === 'COMMUNITY' ? 'tel' : 'text'}
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none focus:border-gray-900 font-black text-gray-800"
                  placeholder={selectedPortal === 'COMMUNITY' ? '0991234567' : 'Ex: ID-001'}
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
                  className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl outline-none focus:border-gray-900 font-black text-gray-800 tracking-[1em] text-center"
                  placeholder="••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all active:scale-95 mt-8 flex items-center justify-center gap-4 ${
                  selectedPortal === 'COMMUNITY' ? 'bg-rose-500 shadow-rose-200' :
                  selectedPortal === 'DPS' ? 'bg-gray-900 shadow-gray-200' :
                  selectedPortal === 'ZONE' ? 'bg-blue-600 shadow-blue-200' : 'bg-[#7BAE7F] shadow-green-200'
                }`}
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : <span>Accéder au Portail</span>}
              </button>
           </form>
        </div>
      </div>
    );
  }

  // Safety guard for null user after auth
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
        <header className="lg:hidden px-6 py-6 flex justify-between items-center bg-transparent relative z-30">
          <button onClick={() => setIsDrawerOpen(true)} className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 border border-gray-50">
            <Shield size={20} />
          </button>
          <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-[#7BAE7F] uppercase tracking-[0.3em]">Comfort ASBL</span>
              <span className="text-[8px] text-gray-300 font-bold uppercase leading-none mt-1">{currentUser.facility || currentUser.zone || 'DPS Nord-Kivu'}</span>
          </div>
          <img src={currentUser.avatar} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" alt="Profile" />
        </header>

        <main className="flex-1 overflow-y-auto page-transition pb-20 lg:pb-10">
          {activeTab === 'home' && (
            currentUser.role === UserRole.FEMME_ENCEINTE 
            ? <PatientHome week={currentUser.pregnancyWeek || 24} /> 
            : <ProviderHome role={currentUser.role} />
          )}
          
          {activeTab === 'monitoring' && (
            currentUser.role === UserRole.FEMME_ENCEINTE 
            ? <PatientMonitoring week={currentUser.pregnancyWeek || 24} /> 
            : (selectedPatient ? <ProviderPatientFile patient={selectedPatient} onBack={() => setSelectedPatient(null)} /> : <ProviderMonitoring onSelectPatient={setSelectedPatient} onStartPartogram={handleStartPartogram} />)
          )}
          
          {activeTab === 'admin' && <AdminPanel user={currentUser} />}
          {activeTab === 'afyabot' && <AfyaBot onBack={() => setActiveTab('home')} />}
          {activeTab === 'referral' && <ReferralSystem />}
          {activeTab === 'stats' && <StatsView />}
          {activeTab === 'alerts' && <AlertsView role={currentUser.role} />}
          {['settings', 'language', 'privacy'].includes(activeTab) && <SettingsView type={activeTab as any} onBack={() => setActiveTab('home')} />}
          {activeTab === 'help' && <EducationView onBack={() => setActiveTab('home')} />}
        </main>
      </div>
    </div>
  );
};

export default App;
