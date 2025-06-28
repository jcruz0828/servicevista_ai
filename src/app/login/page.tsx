'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService, MOCK_USERS } from '@/lib/auth/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickLoginLoading, setQuickLoginLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const session = await AuthService.login(email, password);
      if (session) {
        router.push(AuthService.getDefaultRoute());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userEmail: string, userName: string) => {
    setQuickLoginLoading(userEmail);
    setError('');
    
    try {
      const session = await AuthService.login(userEmail, 'demo');
      if (session) {
        router.push(AuthService.getDefaultRoute());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setQuickLoginLoading(null);
    }
  };

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200',
    office_manager: 'bg-blue-100 text-blue-800 border-blue-200',
    dispatcher: 'bg-green-100 text-green-800 border-green-200',
    customer_service: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    technician: 'bg-orange-100 text-orange-800 border-orange-200',
    accountant: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    sales: 'bg-pink-100 text-pink-800 border-pink-200',
    client: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const roleIcons: Record<string, string> = {
    admin: 'A',
    office_manager: 'M',
    dispatcher: 'D',
    customer_service: 'C',
    technician: 'T',
    accountant: 'F',
    sales: 'S',
    client: 'U',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)]">
        
                <div className="relative max-w-md w-full z-10">

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/80 shadow-2xl shadow-blue-500/10 border-0 ring-1 ring-white/20">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center text-gray-900">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Try Demo Accounts</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {MOCK_USERS.map((user) => (
                    <Button
                      key={user.id}
                      variant="outline"
                      onClick={() => handleQuickLogin(user.email, user.name)}
                      disabled={quickLoginLoading === user.email}
                      className="w-full h-auto p-4 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {roleIcons[user.role]}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 group-hover:text-blue-700">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 group-hover:text-blue-600">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <Badge className={`text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        {quickLoginLoading === user.email && (
                          <div className="ml-2">
                            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
                <svg className="inline w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Click any demo account for instant access • All roles available
              </p>
            </div>
          </CardContent>
        </Card>

          {/* Footer */}
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 