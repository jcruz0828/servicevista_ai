// User and Authentication Types
export type UserRole = 
  | 'admin'
  | 'office_manager'
  | 'dispatcher'
  | 'csr'
  | 'technician'
  | 'accountant'
  | 'sales'
  | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Job Types
export type JobStatus = 
  | 'scheduled'
  | 'dispatched'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'on_hold';

export type JobPriority = 'low' | 'normal' | 'high' | 'emergency';

export interface Job {
  id: string;
  jobNumber: string;
  customerId: string;
  customer: Customer;
  technicianId?: string;
  technician?: User;
  status: JobStatus;
  priority: JobPriority;
  title: string;
  description: string;
  scheduledDate: Date;
  startTime?: Date;
  endTime?: Date;
  estimatedDuration: number; // in minutes
  address: Address;
  latitude?: number;
  longitude?: number;
  totalAmount: number;
  lineItems: JobLineItem[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isLabor: boolean;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  billingAddress: Address;
  serviceAddress?: Address;
  notes?: string;
  totalJobs: number;
  totalRevenue: number;
  lastJobDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Quote Types
export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected' | 'expired';

export interface Quote {
  id: string;
  quoteNumber: string;
  customerId: string;
  customer: Customer;
  status: QuoteStatus;
  title: string;
  description: string;
  lineItems: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  validUntil: Date;
  sentAt?: Date;
  viewedAt?: Date;
  respondedAt?: Date;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
  isOptional: boolean;
}

// Analytics Types
export interface DashboardStats {
  totalJobs: number;
  completedJobs: number;
  totalRevenue: number;
  averageTicket: number;
  technicianUtilization: number;
  customerSatisfaction: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  jobs: number;
}

export interface JobTypeData {
  type: string;
  count: number;
  revenue: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface JobFormData {
  customerId: string;
  title: string;
  description: string;
  scheduledDate: string;
  estimatedDuration: number;
  priority: JobPriority;
  address: Address;
  lineItems: Omit<JobLineItem, 'id'>[];
}

export interface CustomerFormData {
  name: string;
  email?: string;
  phone?: string;
  billingAddress: Address;
  serviceAddress?: Address;
  notes?: string;
}

// Filter and Search Types
export interface JobFilters {
  status?: JobStatus[];
  priority?: JobPriority[];
  technicianId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface CustomerFilters {
  search?: string;
  hasRecentJobs?: boolean;
  sortBy?: 'name' | 'lastJob' | 'totalRevenue';
  sortOrder?: 'asc' | 'desc';
} 