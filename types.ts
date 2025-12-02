export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // URL
  color: 'dolas' | 'maccus';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG path data or component name
  image: string; // Placeholder URL
  price: number;
  discountPrice: number;
  instructorId: string;
  prerequisites: string[];
  features: string[];
  startDate: string;
}

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  isRecommended?: boolean;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export enum EnrollmentStep {
  IDLE = 'IDLE',
  OPENING = 'OPENING', // "Opening..." animation
  FORM = 'FORM',       // User details
  PAYMENT = 'PAYMENT', // Bank details
  SUCCESS = 'SUCCESS', // WhatsApp redirect
}