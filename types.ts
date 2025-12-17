export enum OrderStatus {
  NEW = 'New',
  CUTTING = 'Cutting',
  STITCHING = 'Stitching',
  FIRST_FIT = 'First Fit-On',
  ADJUSTMENTS = 'Adjustments',
  QC = 'Final QC',
  READY = 'Ready',
  DELIVERED = 'Delivered'
}

export enum InquiryStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  CONVERTED = 'Converted',
  LOST = 'Lost'
}

export enum InterestLevel {
  HOT = 'Hot',
  WARM = 'Warm',
  COLD = 'Cold'
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  ltv: number; // Lifetime Value
  notes: string;
  measurements?: Record<string, number>;
  fitPreference: 'Slim' | 'Regular' | 'Comfort';
}

export interface Inquiry {
  id: string;
  clientId: string;
  clientName: string; // Denormalized for ease
  source: 'Website' | 'WhatsApp' | 'Walk-in';
  type: 'New Suit' | 'Alteration' | 'Wedding';
  interestLevel: InterestLevel;
  status: InquiryStatus;
  receivedDate: string;
  lastInteraction: string;
  message: string;
}

export interface Order {
  id: string;
  inquiryId?: string;
  clientId: string;
  clientName: string;
  garmentType: string;
  fabric: string;
  price: number;
  paidAmount: number;
  status: OrderStatus;
  dueDate: string;
  nextFitOnDate?: string;
  tailorAssigned?: string;
  measurements: Record<string, number>;
  notes: string;

  // User Portal Fields
  suggestedFitSlots?: string[];
  selectedFitSlot?: string;
  rating?: number;
  feedback?: string;
  changeRequest?: string;
  changeRequestStatus?: 'Pending' | 'Reviewing' | 'Scheduled' | 'Resolved';
  appointmentSuggestedSlots?: string[];
  appointmentSelectedSlot?: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  type: 'Consultation' | 'Measurement' | 'Fit-On' | 'Adjustment';
  date: string; // ISO String
  durationMin: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface DashboardStats {
  revenueToday: number;
  activeOrders: number;
  pendingInquiries: number;
  upcomingFitOns: number;
}