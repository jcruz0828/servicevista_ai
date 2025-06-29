'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/lib/auth/auth';
import { Module } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredModule?: Module;
}

export default function ProtectedLayout({ children, requiredModule }: ProtectedLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Check module access if required
    if (requiredModule && !AuthService.hasModuleAccess(requiredModule)) {
      router.push(AuthService.getDefaultRoute());
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router, requiredModule]);

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header for Protected Pages */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
                ServiceVista AI
              </h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Role-based Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-3">
            {AuthService.hasModuleAccess('dashboard') && (
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === '/dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
            )}
            {AuthService.hasModuleAccess('jobs') && (
              <Link 
                href="/jobs" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/jobs') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Jobs
              </Link>
            )}
            {AuthService.hasModuleAccess('customers') && (
              <Link 
                href="/customers" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/customers') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Customers
              </Link>
            )}
            {AuthService.hasModuleAccess('quotes') && (
              <Link 
                href="/quotes" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/quotes') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Quotes
              </Link>
            )}
            {AuthService.hasModuleAccess('analytics') && (
              <Link 
                href="/analytics" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/analytics') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Analytics
              </Link>
            )}
            {AuthService.hasModuleAccess('calendar') && (
              <Link 
                href="/calendar" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/calendar') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Calendar
              </Link>
            )}
            {AuthService.hasModuleAccess('employees') && (
              <Link 
                href="/employees" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname.startsWith('/employees') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Employees
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 