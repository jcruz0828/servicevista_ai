'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock backup data
const mockBackupStats = {
  totalBackups: 847,
  totalSize: '2.4TB',
  lastBackup: '2024-01-15T02:00:00Z',
  successRate: 99.2,
  retentionDays: 30,
  avgBackupTime: '45 minutes'
};

const mockBackups = [
  {
    id: 'backup-1',
    name: 'Full System Backup',
    type: 'full',
    status: 'completed',
    startTime: '2024-01-15T02:00:00Z',
    endTime: '2024-01-15T02:45:00Z',
    size: '2.4GB',
    location: 'AWS S3',
    retention: 30
  },
  {
    id: 'backup-2',
    name: 'Database Backup',
    type: 'database',
    status: 'completed',
    startTime: '2024-01-15T01:00:00Z',
    endTime: '2024-01-15T01:15:00Z',
    size: '890MB',
    location: 'AWS S3',
    retention: 90
  },
  {
    id: 'backup-3',
    name: 'File System Backup',
    type: 'files',
    status: 'running',
    startTime: '2024-01-15T14:30:00Z',
    endTime: null,
    size: '1.2GB',
    location: 'Local Storage',
    retention: 7
  },
  {
    id: 'backup-4',
    name: 'Configuration Backup',
    type: 'config',
    status: 'failed',
    startTime: '2024-01-14T23:00:00Z',
    endTime: '2024-01-14T23:05:00Z',
    size: '15MB',
    location: 'AWS S3',
    retention: 30
  }
];

const mockSchedules = [
  {
    id: 'schedule-1',
    name: 'Daily Full Backup',
    type: 'full',
    frequency: 'daily',
    time: '02:00',
    enabled: true,
    lastRun: '2024-01-15T02:00:00Z',
    nextRun: '2024-01-16T02:00:00Z'
  },
  {
    id: 'schedule-2',
    name: 'Hourly Database Backup',
    type: 'database',
    frequency: 'hourly',
    time: '00',
    enabled: true,
    lastRun: '2024-01-15T14:00:00Z',
    nextRun: '2024-01-15T15:00:00Z'
  },
  {
    id: 'schedule-3',
    name: 'Weekly Archive Backup',
    type: 'archive',
    frequency: 'weekly',
    time: '00:00',
    enabled: false,
    lastRun: '2024-01-08T00:00:00Z',
    nextRun: null
  }
];

export default function BackupManagementPage() {
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
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-purple-100 text-purple-800';
      case 'database': return 'bg-blue-100 text-blue-800';
      case 'files': return 'bg-green-100 text-green-800';
      case 'config': return 'bg-orange-100 text-orange-800';
      case 'archive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'backups', label: 'Backups' },
    { id: 'schedules', label: 'Schedules' },
    { id: 'restore', label: 'Restore' }
  ];

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Backup Management</h1>
            <p className="text-gray-600 mt-2">Monitor backups, configure schedules, and manage data recovery</p>
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
              Start Backup
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
                      <p className="text-sm font-medium text-gray-600 mt-2">Total Backups</p>
                      <p className="text-2xl font-bold text-gray-900 mt-3">{mockBackupStats.totalBackups}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600 mt-3">{mockBackupStats.successRate}%</p>
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
                      <p className="text-sm font-medium text-gray-600 mt-2">Total Size</p>
                      <p className="text-2xl font-bold text-purple-600 mt-3">{mockBackupStats.totalSize}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="px-8 py-10">
                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mt-2">Avg Backup Time</p>
                      <p className="text-2xl font-bold text-orange-600 mt-3">{mockBackupStats.avgBackupTime}</p>
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

            {/* Backup Status */}
            <Card>
              <CardHeader>
                <CardTitle>Backup Status</CardTitle>
                <CardDescription>Current backup health and recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {new Date(mockBackupStats.lastBackup).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-green-700">Last Successful Backup</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockBackupStats.retentionDays}</div>
                    <div className="text-sm text-blue-700">Days Retention</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-purple-700">Active Schedules</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Backups Tab */}
        {selectedTab === 'backups' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Backups</CardTitle>
                <CardDescription>View and manage backup history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockBackups.map((backup) => (
                        <tr key={backup.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                            <div className="text-sm text-gray-500">{backup.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getTypeColor(backup.type)}>
                              {backup.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(backup.status)}>
                              {backup.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {backup.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(backup.startTime).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                Restore
                              </Button>
                              <Button size="sm" variant="outline">
                                Delete
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
        )}

        {/* Schedules Tab */}
        {selectedTab === 'schedules' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Schedules</CardTitle>
                <CardDescription>Configure automated backup schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedules.map((schedule) => (
                    <div key={schedule.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{schedule.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getTypeColor(schedule.type)}>
                              {schedule.type}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {schedule.frequency} at {schedule.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={schedule.enabled}
                            readOnly
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Delete</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Last Run:</span>
                          <div className="text-gray-600 mt-1">
                            {schedule.lastRun ? new Date(schedule.lastRun).toLocaleString() : 'Never'}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Next Run:</span>
                          <div className="text-gray-600 mt-1">
                            {schedule.nextRun ? new Date(schedule.nextRun).toLocaleString() : 'Disabled'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Restore Tab */}
        {selectedTab === 'restore' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Restore</CardTitle>
                <CardDescription>Restore data from previous backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-yellow-800">Restore Warning</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Restoring data will overwrite current data. Make sure to create a backup before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Backup</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select a backup to restore...</option>
                        {mockBackups.filter(b => b.status === 'completed').map(backup => (
                          <option key={backup.id} value={backup.id}>
                            {backup.name} - {new Date(backup.startTime).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Restore Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Full Restore</option>
                        <option>Partial Restore</option>
                        <option>Database Only</option>
                        <option>Files Only</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Restore Location</label>
                    <Input placeholder="Enter restore path or leave blank for original location" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="confirm-restore"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="confirm-restore" className="text-sm text-gray-700">
                      I understand that this will overwrite existing data
                    </label>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Start Restore
                    </Button>
                    <Button variant="outline">
                      Preview Restore
                    </Button>
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
