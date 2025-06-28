'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@servicetech.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    avatar: 'JA',
    companyId: 'comp-1'
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@servicetech.com',
    role: 'office_manager',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    avatar: 'SM',
    companyId: 'comp-1'
  },
  {
    id: '3',
    name: 'Mike Dispatcher',
    email: 'dispatch@servicetech.com',
    role: 'dispatcher',
    status: 'active',
    lastLogin: '2024-01-15T08:45:00Z',
    avatar: 'MD',
    companyId: 'comp-1'
  },
  {
    id: '4',
    name: 'Lisa CSR',
    email: 'csr@servicetech.com',
    role: 'csr',
    status: 'active',
    lastLogin: '2024-01-15T11:20:00Z',
    avatar: 'LC',
    companyId: 'comp-1'
  },
  {
    id: '5',
    name: 'Bob Technician',
    email: 'tech@servicetech.com',
    role: 'technician',
    status: 'active',
    lastLogin: '2024-01-15T07:30:00Z',
    avatar: 'BT',
    companyId: 'comp-1'
  },
  {
    id: '6',
    name: 'Mary Accountant',
    email: 'accountant@servicetech.com',
    role: 'accountant',
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z',
    avatar: 'MA',
    companyId: 'comp-1'
  },
  {
    id: '7',
    name: 'Tom Sales',
    email: 'sales@servicetech.com',
    role: 'sales',
    status: 'active',
    lastLogin: '2024-01-15T09:00:00Z',
    avatar: 'TS',
    companyId: 'comp-1'
  },
  {
    id: '8',
    name: 'Jane Customer',
    email: 'client@customer.com',
    role: 'client',
    status: 'inactive',
    lastLogin: '2024-01-10T14:20:00Z',
    avatar: 'JC',
    companyId: 'comp-2'
  }
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const user = AuthService.getCurrentUser();
  if (!user || user.role !== 'admin') {
    return (
      <ProtectedLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </ProtectedLayout>
    );
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'office_manager': return 'bg-blue-100 text-blue-800';
      case 'dispatcher': return 'bg-green-100 text-green-800';
      case 'csr': return 'bg-yellow-100 text-yellow-800';
      case 'technician': return 'bg-purple-100 text-purple-800';
      case 'accountant': return 'bg-indigo-100 text-indigo-800';
      case 'sales': return 'bg-pink-100 text-pink-800';
      case 'client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedStatus('all');
  };

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
            </Button>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600 mt-3">{mockUsers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Active Users</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">{mockUsers.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Admin Users</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">{mockUsers.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Online Now</p>
                  <p className="text-2xl font-bold text-orange-600 mt-3">24</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6 hover:shadow-lg transition-shadow">
          <CardContent className="px-8 py-6">
            <div className="mb-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Users</h3>
                <div className="text-sm text-gray-500">
                  Showing {filteredUsers.length} of {mockUsers.length} users
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Administrator</option>
                    <option value="office_manager">Office Manager</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="csr">Customer Service Rep</option>
                    <option value="technician">Technician</option>
                    <option value="accountant">Accountant</option>
                    <option value="sales">Sales Rep</option>
                    <option value="client">Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearFilters}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Filter Summary */}
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedRole !== 'all' && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    Role: {selectedRole.replace('_', ' ')}
                  </Badge>
                )}
                {selectedStatus !== 'all' && (
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    Status: {selectedStatus}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 