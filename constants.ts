import { Appointment, Client, Inquiry, InquiryStatus, InterestLevel, Order, OrderStatus } from "./types";

export const MOCK_CURRENT_USER_ID = 'c1';

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'James Sterling', phone: '+1 555-0101', email: 'james@sterling.co', totalOrders: 3, ltv: 4500, notes: 'Prefers double vents. Always espresso when visiting.', fitPreference: 'Slim', measurements: { chest: 42, waist: 34, sleeve: 25, shoulder: 18, neck: 16 } },
  { id: 'c2', name: 'Arthur Morgan', phone: '+1 555-0102', email: 'arthur@rdr.net', totalOrders: 1, ltv: 1200, notes: 'Needs rugged stitching. Outdoor use.', fitPreference: 'Comfort', measurements: { chest: 44, waist: 36, sleeve: 26, shoulder: 19, neck: 17 } },
  { id: 'c3', name: 'Elena Fisher', phone: '+1 555-0103', email: 'elena@uncharted.com', totalOrders: 5, ltv: 6000, notes: 'Wedding specialist. Very detail oriented.', fitPreference: 'Regular', measurements: { bust: 36, waist: 28, hips: 38, shoulder: 15 } },
  { id: 'c4', name: 'Thomas Shelby', phone: '+1 555-0104', email: 'tom@shelby.co.uk', totalOrders: 0, ltv: 0, notes: 'Potential high value. Likes tweed.', fitPreference: 'Slim', measurements: { chest: 38, waist: 30, sleeve: 24 } },
  { id: 'c5', name: 'Grace Burgess', phone: '+1 555-0105', email: 'grace@shelby.co.uk', totalOrders: 0, ltv: 0, notes: 'Wedding dress inquiry.', fitPreference: 'Regular', measurements: {} },
  { id: 'c6', name: 'John Doe', phone: '+1 555-0106', email: 'john@doe.com', totalOrders: 1, ltv: 800, notes: 'Standard fit.', fitPreference: 'Regular', measurements: { chest: 40, waist: 32 } },
];

export const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'i1', clientId: 'c4', clientName: 'Thomas Shelby', source: 'Walk-in', type: 'New Suit', interestLevel: InterestLevel.HOT, status: InquiryStatus.NEW, receivedDate: '2023-10-25T10:00:00Z', lastInteraction: '2023-10-25T10:00:00Z', message: 'Looking for a grey tweed 3-piece suit. Urgent.' },
  { id: 'i2', clientId: 'c5', clientName: 'Grace Burgess', source: 'WhatsApp', type: 'Wedding', interestLevel: InterestLevel.WARM, status: InquiryStatus.CONTACTED, receivedDate: '2023-10-24T14:30:00Z', lastInteraction: '2023-10-24T16:00:00Z', message: 'Inquiring about bridal alteration prices.' },
  { id: 'i3', clientId: 'c6', clientName: 'John Doe', source: 'Website', type: 'New Suit', interestLevel: InterestLevel.COLD, status: InquiryStatus.NEW, receivedDate: '2023-10-23T09:00:00Z', lastInteraction: '2023-10-23T09:00:00Z', message: 'Do you make velvet jackets?' },
  { id: 'i4', clientId: 'c1', clientName: 'James Sterling', source: 'WhatsApp', type: 'Alteration', interestLevel: InterestLevel.WARM, status: InquiryStatus.CONTACTED, receivedDate: '2023-10-22T11:00:00Z', lastInteraction: '2023-10-22T12:00:00Z', message: 'Can you adjust the waist on my last trousers?' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', clientId: 'c1', clientName: 'James Sterling', garmentType: 'Navy Blazer', fabric: 'Italian Wool 120s', price: 850, paidAmount: 400, status: OrderStatus.STITCHING, dueDate: '2023-11-05', nextFitOnDate: '2023-11-01', tailorAssigned: 'Mario', measurements: { chest: 42, waist: 34 }, notes: 'Gold buttons requested.' },
  { id: 'o2', clientId: 'c2', clientName: 'Arthur Morgan', garmentType: 'Hunting Coat', fabric: 'Heavy Tweed', price: 1200, paidAmount: 1200, status: OrderStatus.READY, dueDate: '2023-10-28', tailorAssigned: 'Luigi', measurements: { chest: 44, waist: 36 }, notes: 'Extra reinforced pockets.' },
  { id: 'o3', clientId: 'c3', clientName: 'Elena Fisher', garmentType: 'Evening Gown', fabric: 'Silk Satin', price: 2500, paidAmount: 1000, status: OrderStatus.FIRST_FIT, dueDate: '2023-11-15', nextFitOnDate: '2023-10-30', tailorAssigned: 'Sofia', measurements: { bust: 36, waist: 28 }, notes: 'Intricate lace details.' },
  { id: 'o4', clientId: 'c1', clientName: 'James Sterling', garmentType: 'Trousers', fabric: 'Linen', price: 300, paidAmount: 0, status: OrderStatus.NEW, dueDate: '2023-11-20', measurements: { waist: 34, inseam: 32 }, notes: 'Summer wear.' },
  { id: 'o5', clientId: 'c4', clientName: 'Thomas Shelby', garmentType: '3-Piece Suit', fabric: 'Grey Tweed', price: 1500, paidAmount: 500, status: OrderStatus.CUTTING, dueDate: '2023-11-10', tailorAssigned: 'Mario', measurements: { chest: 38, waist: 30 }, notes: 'Hidden pocket for... accessories.' },
  {
    id: 'o6',
    clientId: 'c1',
    clientName: 'James Sterling',
    garmentType: 'Dinner Jacket',
    fabric: 'Velvet',
    price: 900,
    paidAmount: 450,
    status: OrderStatus.FIRST_FIT,
    dueDate: '2023-12-01',
    tailorAssigned: 'Mario',
    measurements: { chest: 42, waist: 34 },
    notes: 'Midnight Blue',
    suggestedFitSlots: ['2023-10-30T10:00:00', '2023-10-31T14:00:00', '2023-11-01T09:00:00']
  },
  {
    id: 'o7',
    clientId: 'c1',
    clientName: 'James Sterling',
    garmentType: 'White Shirt',
    fabric: 'Egyptian Cotton',
    price: 150,
    paidAmount: 150,
    status: OrderStatus.DELIVERED,
    dueDate: '2023-10-15',
    tailorAssigned: 'Sofia',
    measurements: { neck: 16, sleeve: 25 },
    notes: 'Monogram JS'
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', clientId: 'c1', clientName: 'James Sterling', type: 'Fit-On', date: '2023-10-27T10:00:00', durationMin: 45, status: 'Scheduled' },
  { id: 'a2', clientId: 'c3', clientName: 'Elena Fisher', type: 'Consultation', date: '2023-10-27T14:00:00', durationMin: 60, status: 'Scheduled' },
  { id: 'a3', clientId: 'c4', clientName: 'Thomas Shelby', type: 'Measurement', date: '2023-10-28T11:00:00', durationMin: 30, status: 'Scheduled' },
  { id: 'a4', clientId: 'c2', clientName: 'Arthur Morgan', type: 'Consultation', date: '2023-10-05T10:00:00', durationMin: 60, status: 'Completed' },
  { id: 'a5', clientId: 'c6', clientName: 'John Doe', type: 'Measurement', date: '2023-10-12T15:00:00', durationMin: 30, status: 'Completed' },
  { id: 'a6', clientId: 'c1', clientName: 'James Sterling', type: 'Adjustment', date: '2023-11-02T11:00:00', durationMin: 45, status: 'Scheduled' },
  { id: 'a7', clientId: 'c3', clientName: 'Elena Fisher', type: 'Fit-On', date: '2023-10-30T10:00:00', durationMin: 60, status: 'Scheduled' },
  { id: 'a8', clientId: 'c5', clientName: 'Grace Burgess', type: 'Consultation', date: '2023-10-29T16:00:00', durationMin: 45, status: 'Scheduled' },
];