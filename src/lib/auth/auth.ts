import { RoleId, Permission, Module, hasPermission, hasModuleAccess, getDefaultRoute } from './roles';

export interface User {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  companyId: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Mock user data for demonstration
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@servicetech.com',
    name: 'John Admin',
    role: 'admin',
    companyId: 'comp-1',
    isActive: true
  },
  /*
  {
    id: '2',
    email: 'manager@servicetech.com',
    name: 'Sarah Manager',
    role: 'office_manager',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '3',
    email: 'dispatch@servicetech.com',
    name: 'Mike Dispatcher',
    role: 'dispatcher',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '4',
    email: 'csr@servicetech.com',
    name: 'Lisa CSR',
    role: 'csr',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '5',
    email: 'tech@servicetech.com',
    name: 'Bob Technician',
    role: 'technician',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '6',
    email: 'accountant@servicetech.com',
    name: 'Mary Accountant',
    role: 'accountant',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '7',
    email: 'sales@servicetech.com',
    name: 'Tom Sales',
    role: 'sales',
    companyId: 'comp-1',
    isActive: true
  },
  {
    id: '8',
    email: 'client@customer.com',
    name: 'Jane Customer',
    role: 'client',
    companyId: 'comp-2',
    isActive: true
  },
  */
];

export class AuthService {
  private static currentUser: User | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async login(email: string, password: string): Promise<AuthSession | null> {
    // Mock authentication - in real app, this would validate against backend
    const user = MOCK_USERS.find(u => u.email === email && u.isActive);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.currentUser = user;
    
    return {
      user,
      token: `mock-token-${user.id}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
  }

  static logout(): void {
    this.currentUser = null;
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  static hasPermission(permission: Permission): boolean {
    if (!this.currentUser) return false;
    return hasPermission(this.currentUser.role, permission);
  }

  static hasModuleAccess(module: Module): boolean {
    if (!this.currentUser) return false;
    return hasModuleAccess(this.currentUser.role, module);
  }

  static getDefaultRoute(): string {
    if (!this.currentUser) return '/login';
    return getDefaultRoute(this.currentUser.role);
  }

  static requireAuth(): User {
    if (!this.currentUser) {
      throw new Error('Authentication required');
    }
    return this.currentUser;
  }

  static requirePermission(permission: Permission): User {
    const user = this.requireAuth();
    if (!this.hasPermission(permission)) {
      throw new Error(`Permission '${permission}' required`);
    }
    return user;
  }

  static requireModuleAccess(module: Module): User {
    const user = this.requireAuth();
    if (!this.hasModuleAccess(module)) {
      throw new Error(`Access to module '${module}' required`);
    }
    return user;
  }
} 