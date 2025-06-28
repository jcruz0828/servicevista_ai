'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Select } from '@/components/ui/select';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for analytics
const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, jobs: 120, avgTicket: 375 },
  { month: 'Feb', revenue: 52000, jobs: 135, avgTicket: 385 },
  { month: 'Mar', revenue: 48000, jobs: 128, avgTicket: 375 },
  { month: 'Apr', revenue: 55000, jobs: 142, avgTicket: 387 },
  { month: 'May', revenue: 61000, jobs: 158, avgTicket: 386 },
  { month: 'Jun', revenue: 58000, jobs: 145, avgTicket: 400 },
  { month: 'Jul', revenue: 64000, jobs: 160, avgTicket: 400 },
  { month: 'Aug', revenue: 67000, jobs: 168, avgTicket: 399 },
  { month: 'Sep', revenue: 62000, jobs: 155, avgTicket: 400 },
  { month: 'Oct', revenue: 59000, jobs: 148, avgTicket: 399 },
  { month: 'Nov', revenue: 71000, jobs: 178, avgTicket: 399 },
  { month: 'Dec', revenue: 68000, jobs: 170, avgTicket: 400 }
];

const serviceTypes = [
  { type: 'HVAC', revenue: 285000, jobs: 420, percentage: 42 },
  { type: 'Plumbing', revenue: 195000, jobs: 380, percentage: 29 },
  { type: 'Electrical', revenue: 165000, jobs: 290, percentage: 24 },
  { type: 'General Maintenance', revenue: 35000, jobs: 90, percentage: 5 }
];

// Colors for the pie chart
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6B7280'];

const technicianPerformance = [
  { name: 'Mike Rodriguez', jobs: 145, revenue: 58000, rating: 4.9, efficiency: 92 },
  { name: 'Sarah Chen', jobs: 138, revenue: 55200, rating: 4.8, efficiency: 89 },
  { name: 'Bob Wilson', jobs: 142, revenue: 56800, rating: 4.7, efficiency: 88 },
  { name: 'Lisa Wang', jobs: 135, revenue: 54000, rating: 4.9, efficiency: 91 }
];

const customerMetrics = {
  totalCustomers: 1247,
  newCustomers: 89,
  retentionRate: 87,
  avgLifetimeValue: 2850,
  topCustomers: [
    { name: 'Johnson HVAC', revenue: 15600, jobs: 24 },
    { name: 'Office Complex LLC', revenue: 12400, jobs: 18 },
    { name: 'Martinez Auto Shop', revenue: 9800, jobs: 16 },
    { name: 'Green Valley Apartments', revenue: 8900, jobs: 12 },
    { name: 'Downtown Restaurant', revenue: 7200, jobs: 14 }
  ]
};

const financialMetrics = {
  totalRevenue: 680000,
  totalCosts: 408000,
  grossProfit: 272000,
  grossMargin: 40,
  operatingExpenses: 195000,
  netProfit: 77000,
  netMargin: 11.3,
  outstandingAR: 45320,
  averageCollectionPeriod: 28
  };

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const canViewFinancials = () => {
    return ['admin', 'office_manager', 'accountant'].includes(user.role);
  };

  const canViewTechPerformance = () => {
    return ['admin', 'office_manager', 'dispatcher'].includes(user.role);
  };

  const canExportReports = () => {
    return ['admin', 'office_manager', 'accountant'].includes(user.role);
  };

  return (
    <ProtectedLayout requiredModule="analytics">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">
              {user.role === 'accountant' ? 'Financial reports and business intelligence' : 'Business performance metrics and insights'}
            </p>
          </div>
          <div className="flex space-x-3">
            {canExportReports() && (
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Export Report
              </Button>
            )}
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Custom Report
            </Button>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6 shadow-sm border-0 bg-gradient-to-r from-gray-50 to-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4">
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                  <Select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="12months">Last 12 Months</option>
                    <option value="ytd">Year to Date</option>
                    <option value="custom">Custom Range</option>
                  </Select>
                </div>
                
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
                  <Select 
                    value={selectedMetric} 
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="revenue">Revenue</option>
                    <option value="jobs">Job Count</option>
                    <option value="avgTicket">Average Ticket</option>
                    <option value="profit">Profit Margin</option>
                  </Select>
                </div>

                {/* Analytics Summary */}
                <div className="flex items-end space-x-4 ml-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Period</p>
                    <p className="text-xl font-bold text-blue-600">
                      {timeRange === '12months' ? '12 Mo' : timeRange === '90days' ? '90 Days' : timeRange === '30days' ? '30 Days' : 'YTD'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Focus</p>
                    <p className="text-xl font-bold text-purple-600">
                      {selectedMetric === 'revenue' ? 'Revenue' : selectedMetric === 'jobs' ? 'Jobs' : selectedMetric === 'avgTicket' ? 'Avg Ticket' : 'Profit'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Trend</p>
                    <p className="text-xl font-bold text-green-600">↗ +12%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">${financialMetrics.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-2">+12% vs last year</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Jobs</p>
                  <p className="text-2xl font-bold text-blue-600 mt-3">1,780</p>
                  <p className="text-sm text-blue-600 mt-2">+8% vs last year</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Average Ticket</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">$382</p>
                  <p className="text-sm text-purple-600 mt-2">+3% vs last year</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-3">4.8</p>
                  <p className="text-sm text-yellow-600 mt-2">+0.2 vs last year</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <span>Peak: Nov ($71,000)</span>
                <span>Average: $59,167</span>
                <span>Growth: +12%</span>
              </div>
            </CardContent>
          </Card>

          {/* Service Mix */}
          <Card>
            <CardHeader>
              <CardTitle>Service Mix</CardTitle>
              <CardDescription>Revenue breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceTypes.map((service) => (
                  <div key={service.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.type === 'HVAC' ? 'bg-blue-500' :
                        service.type === 'Plumbing' ? 'bg-green-500' :
                        service.type === 'Electrical' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium">{service.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{service.percentage}%</p>
                      <p className="text-xs text-gray-500">${service.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {serviceTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}% ($${props.payload.revenue.toLocaleString()})`,
                        props.payload.type
                      ]}
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Metrics (for accountants and managers) */}
        {canViewFinancials() && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key financial metrics and profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Revenue</span>
                    <span className="font-semibold text-green-600">${financialMetrics.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Costs</span>
                    <span className="font-semibold text-red-600">${financialMetrics.totalCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Gross Profit</span>
                    <span className="font-semibold text-green-600">${financialMetrics.grossProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Gross Margin</span>
                    <span className="text-sm font-semibold">{financialMetrics.grossMargin}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Net Profit</span>
                    <span className="font-semibold text-blue-600">${financialMetrics.netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Net Margin</span>
                    <span className="text-sm font-semibold">{financialMetrics.netMargin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accounts Receivable</CardTitle>
                <CardDescription>Outstanding payments and collection metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">${financialMetrics.outstandingAR.toLocaleString()}</p>
                    <p className="text-sm text-orange-600">Outstanding A/R</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Collection Period</span>
                    <span className="text-sm font-semibold">{financialMetrics.averageCollectionPeriod} days</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>0-30 days</span>
                      <span className="font-semibold">$28,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>31-60 days</span>
                      <span className="font-semibold">$12,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>60+ days</span>
                      <span className="font-semibold text-red-600">$4,620</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full" variant="outline">
                    View A/R Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Technician Performance (for managers and dispatchers) */}
        {canViewTechPerformance() && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
              <CardDescription>Individual technician metrics and rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Technician</th>
                      <th className="text-center py-2">Jobs</th>
                      <th className="text-center py-2">Revenue</th>
                      <th className="text-center py-2">Avg Rating</th>
                      <th className="text-center py-2">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicianPerformance.map((tech) => (
                      <tr key={tech.name} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div className="font-medium">{tech.name}</div>
                        </td>
                        <td className="text-center py-3">{tech.jobs}</td>
                        <td className="text-center py-3 font-semibold text-green-600">${tech.revenue.toLocaleString()}</td>
                        <td className="text-center py-3">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">{tech.rating}</span>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </td>
                        <td className="text-center py-3">
                          <Badge variant={tech.efficiency >= 90 ? 'default' : tech.efficiency >= 85 ? 'secondary' : 'outline'}>
                            {tech.efficiency}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer Metrics */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer Metrics</CardTitle>
              <CardDescription>Customer acquisition and retention insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{customerMetrics.totalCustomers}</p>
                  <p className="text-sm text-blue-600">Total Customers</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{customerMetrics.newCustomers}</p>
                  <p className="text-sm text-green-600">New This Month</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Retention Rate</span>
                  <span className="text-sm font-semibold">{customerMetrics.retentionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Lifetime Value</span>
                  <span className="text-sm font-semibold">${customerMetrics.avgLifetimeValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Highest revenue generating customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerMetrics.topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.jobs} jobs</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">${customer.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
} 