
import React from 'react';
import { NavTab, UserRole } from '../types';
import { NAV_ITEMS_BY_ROLE, DRAWER_ITEMS } from '../constants';
import { X, HeartPulse, LogOut } from 'lucide-react';

interface NavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onLogout: () => void;
  userName?: string;
  role: UserRole;
}

export const BottomNav: React.FC<NavProps> = ({ activeTab, setActiveTab, role }) => {
  const items = NAV_ITEMS_BY_ROLE[role] || [];
  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
      <nav className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[32px] px-2 py-3 shadow-2xl flex justify-around items-center">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                isActive ? 'text-[#7BAE7F] scale-110' : 'text-gray-300'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && <span className="absolute -bottom-1 w-1 h-1 bg-[#7BAE7F] rounded-full"></span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export const DesktopSidebar: React.FC<NavProps> = ({ activeTab, setActiveTab, onLogout, role }) => {
  const items = NAV_ITEMS_BY_ROLE[role] || [];
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-gray-100 flex-col p-8 z-50">
      <div className="flex items-center space-x-3 mb-12">
        <div className="bg-[#7BAE7F] p-2 rounded-xl text-white">
          <HeartPulse size={24} />
        </div>
        <span className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">MaternalCare+</span>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 ml-4">Tableau de Bord</p>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                isActive ? 'bg-[#7BAE7F] text-white shadow-lg shadow-[#7BAE7F]/20' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-8 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-4 p-4 rounded-2xl text-red-400 hover:bg-red-50 font-bold text-sm transition-all"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export const SideDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onLogout: () => void; 
  userName: string; 
  userRole: string; 
  onNavigate: (tab: NavTab) => void;
}> = ({ isOpen, onClose, onLogout, userName, userRole, onNavigate }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl rounded-r-[40px] p-8 flex flex-col">
        <div className="flex justify-between items-center mb-10">
           <span className="text-xl font-black text-[#7BAE7F] uppercase tracking-tighter">MaternalCare+</span>
           <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400"><X size={20} /></button>
        </div>
        <div className="mb-10 flex items-center space-x-4">
           <div className="w-12 h-12 rounded-2xl bg-[#7BAE7F]/10 flex items-center justify-center text-[#7BAE7F] font-bold">{userName.charAt(0)}</div>
           <div><p className="font-bold text-gray-800 leading-none">{userName}</p><p className="text-[10px] text-gray-400 font-black uppercase mt-2">{userRole}</p></div>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
           {DRAWER_ITEMS.map((item) => (
             <button 
               key={item.id} 
               onClick={() => { 
                 if (item.id === 'logout') onLogout();
                 else onNavigate(item.id as NavTab);
                 onClose();
               }} 
               className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all ${item.color || 'text-gray-600'}`}
             >
               <item.icon size={20} /><span>{item.label}</span>
             </button>
           ))}
        </nav>
      </div>
    </div>
  );
};
