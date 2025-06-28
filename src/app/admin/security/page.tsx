'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock security data
const mockSecurityStats = {
  threatLevel: 'low',
  failedLogins: 23,
  blockedIPs: 15,
  activeAlerts: 3,
  lastScan: '2024-01-15T12:00:00Z',
  vulnerabilities: 2
};

const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2024-01-15T14:30:00Z',
    user: 'John Admin',
    action: 'User Created',
    resource: 'users/sarah-manager',
    ip: '192.168.1.100',
    severity: 'info'
  },
  {
    id: 2,
    timestamp: '2024-01-15T14:25:00Z',
    user: 'System',
    action: 'Failed Login Attempt',
    resource: 'auth/login',
    ip: '203.0.113.42',
    severity: 'warning'
  },
  {
    id: 3,
    timestamp: '2024-01-15T14:20:00Z',
    user: 'Sarah Manager',
    action: 'Password Changed',
    resource: 'auth/password',
    ip: '192.168.1.101',
    severity: 'info'
  },
  {
    id: 4,
    timestamp: '2024-01-15T14:15:00Z',
    user: 'System',
    action: 'API Rate Limit Exceeded',
    resource: 'api/jobs',
    ip: '198.51.100.25',
    severity: 'warning'
  }
];

const mockSecurityAlerts = [
  {
    id: 1,
    type: 'Multiple Failed Logins',
    severity: 'high',
    description: 'IP 203.0.113.42 has attempted login 5 times in 10 minutes',
    timestamp: '2024-01-15T14:25:00Z',
    status: 'active'
  },
  {
    id: 2,
    type: 'Suspicious API Activity',
    severity: 'medium',
    description: 'Unusual API usage pattern detected from API key sk_live_*****',
    timestamp: '2024-01-15T13:45:00Z',
    status: 'investigating'
  },
  {
    id: 3,
    type: 'Privilege Escalation',
    severity: 'low',
    description: 'User role change detected: Bob Technician → Office Manager',
    timestamp: '2024-01-15T12:30:00Z',
    status: 'resolved'
  }
];

export default function SecurityManagementPage() {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': case 'critical': return 'bg-red-100 text-red-800';
      case 'medium': case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'low': case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'alerts', label: 'Security Alerts' },
    { id: 'audit', label: 'Audit Logs' },
    { id: 'config', label: 'Configuration' }
  ];

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Management</h1>
            <p className="text-gray-600 mt-2">Monitor security threats, audit logs, and system vulnerabilities</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a1 1 0 001-1v-6a1 1 0 00-1-1H6a1 1 0 00-1 1v6a1 1 0 001 1zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Run Security Scan
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
            {/* Threat Level Indicator */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(mockSecurityStats.threatLevel)}`}></div>
                  <span>Current Threat Level: {mockSecurityStats.threatLevel.toUpperCase()}</span>
                </CardTitle>
                <CardDescription>System security status and threat assessment</CardDescription>
              </CardHeader>
              <CardContent className="px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="text-3xl font-bold text-blue-600 mt-2">Secure</div>
                    <div className="text-sm text-blue-700 mt-3">Overall Status</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="text-3xl font-bold text-green-600 mt-2">99.2%</div>
                    <div className="text-sm text-green-700 mt-3">Security Score</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                    <div className="text-3xl font-bold text-yellow-600 mt-2">{mockSecurityStats.activeAlerts}</div>
                    <div className="text-sm text-yellow-700 mt-3">Active Alerts</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="text-3xl font-bold text-purple-600 mt-2">
                      {new Date(mockSecurityStats.lastScan).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-purple-700 mt-3">Last Scan</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                      <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.failedLogins}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Blocked IPs</p>
                      <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.blockedIPs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 7h16M4 12h8M4 17h8" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                      <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.activeAlerts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Vulnerabilities</p>
                      <p className="text-2xl font-bold text-gray-900">{mockSecurityStats.vulnerabilities}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Security Alerts Tab */}
        {selectedTab === 'alerts' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Monitor and respond to security threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSecurityAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{alert.type}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Investigate</Button>
                          <Button size="sm" variant="outline">Resolve</Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Audit Logs Tab */}
        {selectedTab === 'audit' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>Track all system activities and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resource
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockAuditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.resource}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.ip}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
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

        {/* Configuration Tab */}
        {selectedTab === 'config' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
                <CardDescription>Configure security policies and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium text-gray-900">Require Two-Factor Authentication</label>
                          <p className="text-sm text-gray-600">Force all users to enable 2FA</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <Input type="number" defaultValue="30" className="max-w-xs" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                        <Input type="number" defaultValue="90" className="max-w-xs" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Rate Limiting</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Login Attempts (per hour)</label>
                        <Input type="number" defaultValue="5" className="max-w-xs" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Requests (per minute)</label>
                        <Input type="number" defaultValue="100" className="max-w-xs" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">IP Filtering</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium text-gray-900">Enable IP Whitelist</label>
                          <p className="text-sm text-gray-600">Only allow access from specific IP addresses</p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blocked IP Addresses</label>
                        <textarea
                          className="w-full p-3 border rounded-lg"
                          rows={3}
                          placeholder="Enter IP addresses to block (one per line)"
                        />
                      </div>
                    </div>
                  </div>

                  <Button>
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
