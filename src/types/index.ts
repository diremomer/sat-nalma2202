export type UserRole = 'talep_acan' | 'satin_alma_uzmani' | 'mudur';

export type UserStatus = 'beklemede' | 'onaylanmis' | 'reddedilmis';

export interface User {
  id: string;
  email: string;
  full_name: string;
  department: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}

export interface PurchaseRequest {
  id: string;
  requester_id: string;
  title: string;
  description: string;
  estimated_cost: number;
  status: 'beklemede' | 'incelemede' | 'onaylandi' | 'reddedildi' | 'tamamlandi';
  priority: 'dusuk' | 'orta' | 'yuksek';
  created_at: string;
  updated_at: string;
}