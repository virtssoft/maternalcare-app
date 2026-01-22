
import { UserRole } from './types';
import { Home, ClipboardList, MapPin, MessageSquareMore, BarChart3, Settings, ShieldCheck, Bell, HelpCircle, Languages, LogOut } from 'lucide-react';

export const ZONES_SANTE = ['Goma', 'Karisimbi', 'Nyiragongo'];

export const AIRES_BY_ZONE: Record<string, string[]> = {
  'Goma': ['Kasika', 'Kyeshero', 'Katindo'],
  'Karisimbi': ['Mabanga', 'Murara', 'Ndosho'],
  'Nyiragongo': ['Rusayo', 'Kiziba', 'Turunga']
};

export const MOCK_USERS = [
  { id: 'u1', agentId: 'ID-001', pin: '0000', name: 'Admin DPS', role: UserRole.ADMIN_DPS, avatar: 'https://i.pravatar.cc/150?u=dps' },
  { id: 'u2', agentId: 'ID-001', pin: '0000', name: 'Admin Zone Goma', role: UserRole.ADMIN_ZONE, zone: 'Goma', avatar: 'https://i.pravatar.cc/150?u=zadmin' },
  { id: 'u3', agentId: 'ID-002', pin: '1234', name: 'Personnel Zone', role: UserRole.PERSONNEL_ZONE, zone: 'Karisimbi', avatar: 'https://i.pravatar.cc/150?u=zmed' },
  { id: 'u4', agentId: 'ID-001', pin: '0000', name: 'Admin Aire Rusayo', role: UserRole.ADMIN_AIRE, facility: 'Rusayo', avatar: 'https://i.pravatar.cc/150?u=aadmin' },
  { id: 'u5', agentId: 'ID-002', pin: '1234', name: 'Personnel Aire', role: UserRole.PERSONNEL_AIRE, facility: 'Rusayo', avatar: 'https://i.pravatar.cc/150?u=amed' },
  { id: 'u6', phone: '0991234567', pin: '1234', name: 'Maman Divine', role: UserRole.FEMME_ENCEINTE, pregnancyWeek: 28, avatar: 'https://i.pravatar.cc/150?u=mama' },
];

export const NAV_ITEMS_BY_ROLE: Record<string, any[]> = {
  [UserRole.ADMIN_DPS]: [
    { id: 'home', label: 'Supervision', icon: BarChart3 },
    { id: 'stats', label: 'Impact', icon: ShieldCheck },
    { id: 'admin', label: 'Zones', icon: Settings },
  ],
  [UserRole.ADMIN_ZONE]: [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'referral', label: 'Transferts', icon: MapPin },
    { id: 'admin', label: 'Aires', icon: Settings },
  ],
  [UserRole.PERSONNEL_ZONE]: [
    { id: 'home', label: 'Activités', icon: Home },
    { id: 'referral', label: 'Transferts', icon: MapPin },
    { id: 'stats', label: 'Indicateurs', icon: BarChart3 },
  ],
  [UserRole.ADMIN_AIRE]: [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'monitoring', label: 'CPN', icon: ClipboardList },
    { id: 'admin', label: 'Inscriptions', icon: Settings },
  ],
  [UserRole.PERSONNEL_AIRE]: [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'monitoring', label: 'CPN', icon: ClipboardList },
    { id: 'afyabot', label: 'AfyaBot', icon: MessageSquareMore },
  ],
  [UserRole.FEMME_ENCEINTE]: [
    { id: 'home', label: 'Ma Grossesse', icon: Home },
    { id: 'afyabot', label: 'AfyaBot', icon: MessageSquareMore },
    { id: 'monitoring', label: 'Mon Suivi', icon: ClipboardList },
  ]
};

export const DRAWER_ITEMS = [
  { id: 'alerts', label: 'Notifications', icon: Bell },
  { id: 'help', label: 'Aide & Conseils', icon: HelpCircle },
  { id: 'language', label: 'Changer de langue', icon: Languages },
  { id: 'privacy', label: 'Confidentialité', icon: ShieldCheck },
  { id: 'settings', label: 'Paramètres', icon: Settings },
  { id: 'logout', label: 'Déconnexion', icon: LogOut, color: 'text-red-500' },
];

export const MOCK_PATIENTS = [
  { id: 'p1', name: 'Zawadi Furaha', age: 24, pregnancyWeek: 32, lastVisit: '2024-03-22', riskLevel: 'low', photo: 'https://i.pravatar.cc/150?u=zawadi' },
  { id: 'p2', name: 'Neema Bahati', age: 29, pregnancyWeek: 38, lastVisit: '2024-03-21', riskLevel: 'high', photo: 'https://i.pravatar.cc/150?u=neema' },
];
