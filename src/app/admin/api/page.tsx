'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock API data
const mockApiStats = {
  totalRequests: 2547891,
  requestsToday: 45782,
  avgResponseTime: 125,
  errorRate: 0.34,
  activeKeys: 23,
  rateLimitHits: 156
};

const mockApiKeys = [
  {
    id: 'key-1',
    name: 'Mobile App',
    key: 'sv_live_••••••••••••••••••••••••••••',
    status: 'active',
    lastUsed: '2024-01-15T14:30:00Z',
    requests: 125847,
    rateLimit: 1000,
    permissions: ['read', 'write']
  },
  {
    id: 'key-2',
    name: 'Third Party Integration',
    key: 'sv_live_••••••••••••••••••••••••••••',
    status: 'active',
    lastUsed: '2024-01-15T13:45:00Z',
    requests: 89423,
    rateLimit: 500,
    permissions: ['read']
  },
  {
    id: 'key-3',
    name: 'Analytics Dashboard',
    key: 'sv_test_••••••••••••••••••••••••••••',
    status: 'inactive',
    lastUsed: '2024-01-10T09:15:00Z',
    requests: 2456,
    rateLimit: 100,
    permissions: ['read']
  }
];

const mockEndpoints = [
  {
    path: '/api/jobs',
    method: 'GET',
    requests: 156789,
    avgResponseTime: 95,
    errorRate: 0.12,
    status: 'healthy'
  },
  {
    path: '/api/jobs',
    method: 'POST',
    requests: 45623,
    avgResponseTime: 145,
    errorRate: 0.08,
    status: 'healthy'
  },
  {
    path: '/api/customers',
    method: 'GET',
    requests: 89456,
    avgResponseTime: 78,
    errorRate: 0.05,
    status: 'healthy'
  },
  {
    path: '/api/auth/login',
    method: 'POST',
    requests: 23789,
    avgResponseTime: 234,
    errorRate: 2.45,
    status: 'warning'
  },
  {
    path: '/api/quotes',
    method: 'GET',
    requests: 67890,
    avgResponseTime: 112,
    errorRate: 0.15,
    status: 'healthy'
  }
];

export default function ApiManagementPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'healthy': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'keys', label: 'API Keys' },
    { id: 'endpoints', label: 'Endpoints' },
    { id: 'logs', label: 'Logs' }
  ];

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Management</h1>
            <p className="text-gray-600 mt-2">Monitor API usage, manage keys, and configure endpoints</p>
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
              Generate API Key
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-900 mt-3">{mockApiStats.totalRequests.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Requests Today</p>
                      <p className="text-2xl font-bold text-green-600 mt-3">{mockApiStats.requestsToday.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Avg Response Time</p>
                      <p className="text-2xl font-bold text-orange-600 mt-3">{mockApiStats.avgResponseTime}ms</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Error Rate</p>
                      <p className="text-2xl font-bold text-red-600 mt-3">{mockApiStats.errorRate}%</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Active Keys</p>
                      <p className="text-2xl font-bold text-purple-600 mt-3">{mockApiStats.activeKeys}</p>
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

            {/* API Health Status */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>API Health Status</CardTitle>
                <CardDescription>Real-time monitoring of API endpoints</CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="text-3xl font-bold text-green-600 mt-2">99.8%</div>
                    <div className="text-sm text-green-700 mt-3">Uptime</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="text-3xl font-bold text-blue-600 mt-2">{mockApiStats.requestsToday.toLocaleString()}</div>
                    <div className="text-sm text-blue-700 mt-3">Requests Today</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <div className="text-3xl font-bold text-yellow-600 mt-2">{mockApiStats.rateLimitHits}</div>
                    <div className="text-sm text-yellow-700 mt-3">Rate Limit Hits</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* API Keys Tab */}
        {selectedTab === 'keys' && (
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys and their permissions</CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="space-y-4">
                  {mockApiKeys.map((key) => (
                    <div key={key.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{key.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(key.status)}>
                              {key.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {key.requests.toLocaleString()} requests
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Revoke</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">API Key:</span>
                          <div className="font-mono text-gray-600 bg-gray-50 p-2 rounded mt-1">
                            {key.key.substring(0, 20)}...
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Rate Limit:</span>
                          <div className="text-gray-600 mt-1">{key.rateLimit} req/hour</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Last Used:</span>
                          <div className="text-gray-600 mt-1">
                            {new Date(key.lastUsed).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="font-medium text-gray-700">Permissions:</span>
                        <div className="flex space-x-2 mt-1">
                          {key.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Endpoints Tab */}
        {selectedTab === 'endpoints' && (
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Monitor endpoint performance and health</CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Endpoint
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Requests
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Response
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Error Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockEndpoints.map((endpoint, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-sm text-gray-900">{endpoint.path}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-xs">
                              {endpoint.method}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {endpoint.requests.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {endpoint.avgResponseTime}ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {endpoint.errorRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(endpoint.status)}>
                              {endpoint.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Logs Tab */}
        {selectedTab === 'logs' && (
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>API Logs</CardTitle>
                <CardDescription>Real-time API request logs and debugging information</CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div>[2024-01-15 14:32:15] GET /api/jobs - 200 - 95ms - API Key: sk_live_4eC39...</div>
                    <div>[2024-01-15 14:32:12] POST /api/customers - 201 - 145ms - API Key: sk_live_4eC39...</div>
                    <div>[2024-01-15 14:32:08] GET /api/quotes/12345 - 200 - 78ms - API Key: sk_live_51HyT...</div>
                    <div className="text-red-400">[2024-01-15 14:32:05] POST /api/auth/login - 429 - 12ms - Rate limit exceeded</div>
                    <div>[2024-01-15 14:32:02] GET /api/analytics - 200 - 234ms - API Key: sk_live_4eC39...</div>
                    <div>[2024-01-15 14:31:58] PUT /api/jobs/67890 - 200 - 167ms - API Key: sk_live_4eC39...</div>
                    <div className="text-yellow-400">[2024-01-15 14:31:55] GET /api/customers - 404 - 45ms - Resource not found</div>
                    <div>[2024-01-15 14:31:52] GET /api/dashboard/stats - 200 - 89ms - API Key: sk_live_51HyT...</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V8" />
                    </svg>
                    Download Logs
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Clear</Button>
                    <Button variant="outline" size="sm">Refresh</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
