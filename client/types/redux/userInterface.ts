export interface AuthUserInfoInterface {
  name: string | null;
  email: string | null;
  id: number | null;
  role: string | null;
}

export interface TuitionRateInterface {
  ol_rate?: number;
  tl_rate?: number;
  sl_rate?: number;
}

export interface SingleUserInterface {
  id: number | null;
  name: string;
  phone: string;
  image?: string;
  cc: string;
  email: string;
  district?: string;
  presentaddress: string;
  role: string;
  age?: number | null;
  profession: string;
  institution: string;
  experience: string;
  isActive: string;
  isVerified: boolean;
  tutionplace: string;
  tuitionmedium: string;
  isAvailable: true;
  tl_rate?: number | null;
  sl_rate?: number | null;
  ol_rate?: number | null;
  totalHours?: number;
  ref?: number;
  createdAt?: string;
  updatedAt?: string;
}
