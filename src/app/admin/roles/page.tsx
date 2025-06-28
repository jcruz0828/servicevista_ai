'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import { ROLES } from '@/lib/auth/roles';
import Link from 'next/link';

export default function RoleManagementPage() {
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

  const roles = Object.values(ROLES);

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'office_manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dispatcher': return 'bg-green-100 text-green-800 border-green-200';
      case 'csr': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'technician': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'accountant': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'sales': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'client': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-600 mt-2">Define and manage user roles and permissions</p>
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
              Create Custom Role
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Roles</p>
                  <p className="text-2xl font-bold text-blue-600 mt-3">{roles.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Active Roles</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">{roles.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Permissions</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">27</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className={`border-2 hover:shadow-lg transition-shadow ${getRoleColor(role.id).split(' ').pop()}`}>
              <CardHeader className="px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={getRoleColor(role.id)}>
                        {role.title}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {role.description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    {role.id !== 'admin' && (
                      <Button size="sm" variant="outline">
                        Duplicate
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="space-y-4">
                  {/* Module Access */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Module Access</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.moduleAccess === '*' ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          All Modules
                        </Badge>
                      ) : Array.isArray(role.moduleAccess) ? (
                        role.moduleAccess.map((module) => (
                          <Badge key={module} variant="secondary">
                            {module}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          No Access
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Permissions ({role.permissions.length})
                    </h4>
                    <div className="max-h-32 overflow-y-auto">
                      <div className="grid grid-cols-1 gap-1">
                        {role.permissions.map((permission) => (
                          <div key={permission} className="text-sm text-gray-600 py-1 px-2 bg-gray-50 rounded text-center">
                            {permission.replace('_', ' ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Default Route */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Default Route</h4>
                    <Badge variant="outline">
                      {role.defaultRoute}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permission Matrix */}
        <Card className="mt-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Overview of permissions across all roles</CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission
                    </th>
                    {roles.map((role) => (
                      <th key={role.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {role.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    'user_management',
                    'role_assignment', 
                    'system_settings',
                    'jobs_read_write',
                    'customers_read_write',
                    'jobs_assign',
                    'jobs_create',
                    'jobs_view',
                    'financial_reports_view',
                    'quotes_create'
                  ].map((permission) => (
                    <tr key={permission}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {permission.replace('_', ' ')}
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="px-6 py-4 whitespace-nowrap text-center">
                          {role.id === 'admin' || role.permissions.includes(permission as any) ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </td>
                      ))}
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