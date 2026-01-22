
export enum UserRole {
  ADMIN_DPS = 'ADMIN_DPS',
  ADMIN_ZONE = 'ADMIN_ZONE',
  PERSONNEL_ZONE = 'PERSONNEL_ZONE',
  ADMIN_AIRE = 'ADMIN_AIRE',
  PERSONNEL_AIRE = 'PERSONNEL_AIRE',
  FEMME_ENCEINTE = 'FEMME_ENCEINTE'
}

export type PortalType = 'DPS' | 'ZONE' | 'AIRE' | 'COMMUNITY' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  agentId?: string;
  facility?: string;
  zone?: string;
  avatar?: string;
  pregnancyWeek?: number;
}

export type NavTab = 'home' | 'monitoring' | 'referral' | 'afyabot' | 'stats' | 'admin' | 'alerts' | 'settings' | 'language' | 'help' | 'privacy';

export interface Patient {
  id: string;
  name: string;
  age: number;
  pregnancyWeek: number;
  lastVisit: string;
  riskLevel: 'low' | 'medium' | 'high';
  photo: string;
  phone?: string;
}

export interface CPNVisit {
  id: string;
  date: string;
  weight: number;
  bp: string;
  conjunctiva: string;
  fundalHeight: number;
  fetalHeartRate: number;
  fetalMovements: boolean;
  presentation: string;
  liquidLoss: string;
  albuminuria: string;
  glycosuria: string;
  treatments: string[];
}
