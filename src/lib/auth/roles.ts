export type Permission = 
  | 'user_management'
  | 'role_assignment'
  | 'system_settings'
  | 'all_api_scopes'
  | 'jobs_read_write'
  | 'customers_read_write'
  | 'pricebook_manage'
  | 'reports_view'
  | 'payments_refund'
  | 'jobs_assign'
  | 'gps_live_view'
  | 'technician_chat'
  | 'jobs_create'
  | 'customers_create'
  | 'jobs_view'
  | 'jobs_view_assigned'
  | 'jobs_status_update'
  | 'forms_submit'
  | 'payments_collect'
  | 'financial_reports_view'
  | 'gl_sync'
  | 'payroll_export'
  | 'quotes_create'
  | 'quotes_send'
  | 'customers_view'
  | 'jobs_view_own'
  | 'invoice_pay';

export type Module = 'dashboard' | 'jobs' | 'customers' | 'quotes' | 'analytics' | 'calendar' | 'employees';

export type RoleId = 'admin' | 'office_manager' | 'dispatcher' | 'csr' | 'technician' | 'accountant' | 'sales' | 'client';

export interface Role {
  id: RoleId;
  title: string;
  description: string;
  moduleAccess: Module[] | '*';
  permissions: Permission[];
  defaultRoute: string;
}

export const ROLES: Record<RoleId, Role> = {
  admin: {
    id: 'admin',
    title: 'Administrator',
    description: 'Owner‑level super‑user with unrestricted access across ServiceVista AI.',
    moduleAccess: '*',
    permissions: [
      'user_management',
      'role_assignment',
      'system_settings',
      'all_api_scopes'
    ],
    defaultRoute: '/dashboard'
  },
  office_manager: {
    id: 'office_manager',
    title: 'Office Manager',
    description: 'Oversees day‑to‑day back‑office operations—jobs, customers, accounting, pricebook.',
    moduleAccess: ['dashboard', 'jobs', 'customers', 'quotes', 'analytics', 'calendar', 'employees'],
    permissions: [
      'jobs_read_write',
      'customers_read_write',
      'pricebook_manage',
      'reports_view',
      'payments_refund'
    ],
    defaultRoute: '/dashboard'
  },
  dispatcher: {
    id: 'dispatcher',
    title: 'Dispatcher',
    description: 'Owns the dispatch board—assigns jobs, tracks tech GPS, handles real‑time changes.',
    moduleAccess: ['dashboard', 'jobs', 'calendar'],
    permissions: [
      'jobs_assign',
      'gps_live_view',
      'technician_chat'
    ],
    defaultRoute: '/dashboard'
  },
  csr: {
    id: 'csr',
    title: 'Customer Service Rep',
    description: 'Books inbound calls, creates new customers, schedules basic jobs.',
    moduleAccess: ['jobs', 'customers'],
    permissions: [
      'jobs_create',
      'customers_create',
      'jobs_view'
    ],
    defaultRoute: '/jobs'
  },
  technician: {
    id: 'technician',
    title: 'Field Technician',
    description: 'Mobile‑only access to assigned jobs, time tracking, forms, and payment capture.',
    moduleAccess: ['jobs'],
    permissions: [
      'jobs_view_assigned',
      'jobs_status_update',
      'forms_submit',
      'payments_collect'
    ],
    defaultRoute: '/jobs'
  },
  accountant: {
    id: 'accountant',
    title: 'Accountant / Bookkeeper',
    description: 'Handles financial reconciliation, GL sync, payroll, and advanced reports.',
    moduleAccess: ['analytics'],
    permissions: [
      'financial_reports_view',
      'gl_sync',
      'payroll_export'
    ],
    defaultRoute: '/analytics'
  },
  sales: {
    id: 'sales',
    title: 'Sales Representative',
    description: 'Creates estimates, manages opportunities, tracks close rates.',
    moduleAccess: ['quotes', 'customers'],
    permissions: [
      'quotes_create',
      'quotes_send',
      'customers_view'
    ],
    defaultRoute: '/quotes'
  },
  client: {
    id: 'client',
    title: 'Client Portal User',
    description: 'End‑customer role with read‑only access to their own jobs, invoices, and payments.',
    moduleAccess: ['jobs'],
    permissions: [
      'jobs_view_own',
      'invoice_pay'
    ],
    defaultRoute: '/portal'
  }
};

export function hasPermission(userRole: RoleId, permission: Permission): boolean {
  const role = ROLES[userRole];
  if (!role) return false;
  
  // Admin has all permissions
  if (userRole === 'admin') return true;
  
  return role.permissions.includes(permission);
}

export function hasModuleAccess(userRole: RoleId, module: Module): boolean {
  const role = ROLES[userRole];
  if (!role) return false;
  
  // Admin has access to all modules
  if (role.moduleAccess === '*') return true;
  
  return Array.isArray(role.moduleAccess) && role.moduleAccess.includes(module);
}

export function getDefaultRoute(userRole: RoleId): string {
  const role = ROLES[userRole];
  return role?.defaultRoute || '/dashboard';
}

export function getRoleTitle(userRole: RoleId): string {
  const role = ROLES[userRole];
  return role?.title || 'Unknown Role';
} 