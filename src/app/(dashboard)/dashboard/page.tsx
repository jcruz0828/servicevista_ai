'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';

// Mock data for demonstration
const dashboardStats = [
  {
    title: "Active Jobs",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: "Revenue Today",
    value: "$12,450",
    change: "+8%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  },
  {
    title: "Available Techs",
    value: "8/12",
    change: "-2",
    trend: "down",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    )
  },
  {
    title: "Customer Satisfaction",
    value: "98.5%",
    change: "+2.1%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const recentJobs = [
  {
    id: "JOB-2024-0892",
    customer: "Johnson HVAC",
    service: "AC Unit Repair",
    technician: "Mike Rodriguez",
    status: "in_progress",
    priority: "high",
    scheduled: "2:00 PM",
    location: "Downtown"
  },
  {
    id: "JOB-2024-0893",
    customer: "Smith Residence",
    service: "Plumbing Inspection",
    technician: "Sarah Chen",
    status: "scheduled",
    priority: "normal",
    scheduled: "3:30 PM",
    location: "Westside"
  },
  {
    id: "JOB-2024-0894",
    customer: "Office Complex",
    service: "Electrical Maintenance",
    technician: "Unassigned",
    status: "pending",
    priority: "urgent",
    scheduled: "4:00 PM",
    location: "Business District"
  }
];

const technicianStatus = [
  {
    name: "Mike Rodriguez",
    status: "on_job",
    currentJob: "JOB-2024-0892",
    location: "Downtown",
    eta: "45 min"
  },
  {
    name: "Sarah Chen",
    status: "traveling",
    currentJob: "JOB-2024-0893",
    location: "En route",
    eta: "15 min"
  },
  {
    name: "John Smith",
    status: "available",
    currentJob: null,
    location: "Home Base",
    eta: null
  },
  {
    name: "Lisa Wang",
    status: "off_duty",
    currentJob: null,
    location: "Off Duty",
    eta: null
  }
];

export default function Dashboard() {
  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const getRoleDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'office_manager':
        return <OfficeManagerDashboard />;
      case 'dispatcher':
        return <DispatcherDashboard />;
      case 'csr':
        return <CSRDashboard />;
      case 'technician':
        return <TechnicianDashboard />;
      case 'accountant':
        return <AccountantDashboard />;
      case 'sales':
        return <SalesDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <ProtectedLayout requiredModule="dashboard">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good afternoon, {user.name}!</h1>
          <p className="text-gray-600">Here's your personalized dashboard for {user.role.replace('_', ' ')} role.</p>
        </div>

        {getRoleDashboardContent()}
      </div>
    </ProtectedLayout>
  );
}

// Role-specific dashboard components
function AdminDashboard() {
  // Color mappings for Tailwind CSS
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Administrator Dashboard</h2>
        <p className="text-blue-100">Complete system oversight and management capabilities</p>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Users",
            value: "156",
            change: "+12",
            trend: "up",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            ),
            color: "blue"
          },
          {
            title: "System Health",
            value: "99.8%",
            change: "+0.2%",
            trend: "up",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            color: "green"
          },
          {
            title: "Active Sessions",
            value: "47",
            change: "+8",
            trend: "up",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
            color: "purple"
          },
          {
            title: "Data Storage",
            value: "2.4TB",
            change: "+120GB",
            trend: "up",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            ),
            color: "orange"
          }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-3">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-2">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Management Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>System Administration</span>
              </CardTitle>
              <CardDescription>Core administrative functions and system management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                                 {[
                   {
                     title: "User Management",
                     description: "Manage user accounts, roles, and permissions",
                     href: "/admin/users",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                       </svg>
                     ),
                     color: "blue",
                     count: "156 users"
                   },
                   {
                     title: "Role Management",
                     description: "Define and assign user roles and permissions",
                     href: "/admin/roles",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                       </svg>
                     ),
                     color: "purple",
                     count: "8 roles"
                   },
                   {
                     title: "System Settings",
                     description: "Configure system-wide preferences and settings",
                     href: "/admin/settings",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                     ),
                     color: "green",
                     count: "24 settings"
                   },
                   {
                     title: "API Management",
                     description: "Configure API access and integrations",
                     href: "/admin/api",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                       </svg>
                     ),
                     color: "orange",
                     count: "12 endpoints"
                   },
                   {
                     title: "Backup & Recovery",
                     description: "Manage data backups and system recovery",
                     href: "/admin/backup",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                       </svg>
                     ),
                     color: "indigo",
                     count: "Daily backups"
                   },
                   {
                     title: "Security Center",
                     description: "Monitor security events and access logs",
                     href: "/admin/security",
                     icon: (
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM10 11V9a2 2 0 114 0v2a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2a1 1 0 011-1z" />
                       </svg>
                     ),
                     color: "red",
                     count: "0 alerts"
                   }
                 ].map((item, index) => (
                   <Link key={index} href={item.href} className="group p-6 border rounded-lg hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all duration-200 block">
                     <div className="flex items-start space-x-3">
                       <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                         {item.icon}
                       </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                        <div className="text-xs text-gray-500 mt-2 font-medium">{item.count}</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span>System Activity</span>
                </div>
                <Badge variant="outline">Live</Badge>
              </CardTitle>
              <CardDescription>Real-time system events and user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                                 {[
                   {
                     type: "user_login",
                     user: "Sarah Manager",
                     action: "logged in to the system",
                     time: "2 minutes ago",
                     icon: (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                       </svg>
                     ),
                     color: "green"
                   },
                   {
                     type: "job_created",
                     user: "Lisa CSR",
                     action: "created new job #JOB-2024-0895",
                     time: "5 minutes ago",
                     icon: (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                       </svg>
                     ),
                     color: "blue"
                   },
                   {
                     type: "system_backup",
                     user: "System",
                     action: "completed daily backup",
                     time: "1 hour ago",
                     icon: (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                       </svg>
                     ),
                     color: "purple"
                   },
                   {
                     type: "user_role_change",
                     user: "John Admin",
                     action: "updated permissions for Mike Dispatcher",
                     time: "2 hours ago",
                     icon: (
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                       </svg>
                     ),
                     color: "orange"
                   }
                 ].map((activity, index) => (
                   <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                     <div className={`p-2 rounded-lg bg-${activity.color}-100 text-${activity.color}-600`}>
                       {activity.icon}
                     </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-${activity.color}-400`}></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span className="font-medium">34%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Disk Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { service: "Web Server", status: "online", uptime: "99.9%" },
                  { service: "Database", status: "online", uptime: "99.8%" },
                  { service: "API Gateway", status: "online", uptime: "99.7%" },
                  { service: "File Storage", status: "online", uptime: "100%" },
                  { service: "Email Service", status: "maintenance", uptime: "95.2%" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{service.service}</div>
                      <div className="text-xs text-gray-500">Uptime: {service.uptime}</div>
                    </div>
                    <Badge className={
                      service.status === 'online' ? 'bg-green-100 text-green-800' :
                      service.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/admin/settings">
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    System Overview
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    User Management
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button className="w-full justify-start" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    System Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



function OfficeManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operations Overview</CardTitle>
            <CardDescription>Manage day-to-day operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/jobs" className="block p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Job Management</div>
                <div className="text-sm text-gray-600">{recentJobs.length} active jobs</div>
              </Link>
              <Link href="/customers" className="block p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Customer Database</div>
                <div className="text-sm text-gray-600">Manage customer information</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Today's Revenue</span>
                <span className="font-semibold">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Payments</span>
                <span className="font-semibold">$8,320</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Target</span>
                <span className="font-semibold">$125,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DispatcherDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
            <p className="text-sm text-gray-600">Jobs in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Techs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">8/12</div>
            <p className="text-sm text-gray-600">Ready for dispatch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">3</div>
            <p className="text-sm text-gray-600">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dispatch Board</CardTitle>
            <CardDescription>Assign and track jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{job.customer}</div>
                    <div className="text-sm text-gray-600">{job.service}</div>
                    <div className="text-xs text-gray-500">{job.scheduled} - {job.location}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={job.priority === 'urgent' ? 'destructive' : job.priority === 'high' ? 'default' : 'secondary'}>
                      {job.priority}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">{job.technician}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technician Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {technicianStatus.map((tech) => (
                <div key={tech.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{tech.name}</div>
                    <div className="text-sm text-gray-600">{tech.location}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={tech.status === 'available' ? 'secondary' : tech.status === 'on_job' ? 'default' : 'outline'}>
                      {tech.status.replace('_', ' ')}
                    </Badge>
                    {tech.eta && <div className="text-xs text-gray-500 mt-1">ETA: {tech.eta}</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CSRDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calls Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
            <p className="text-sm text-gray-600">Inbound calls handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobs Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">18</div>
            <p className="text-sm text-gray-600">Scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <p className="text-sm text-gray-600">Added today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/jobs">
                <Button className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Schedule Job</span>
                  <span className="text-xs text-gray-600">Book new appointment</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span className="font-medium">Add Customer</span>
                  <span className="text-xs text-gray-600">Create new customer</span>
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-medium">View Jobs</span>
                  <span className="text-xs text-gray-600">Check schedule</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-medium">Customer Search</span>
                  <span className="text-xs text-gray-600">Find existing customer</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium">Mrs. Johnson</div>
                <div className="text-sm text-gray-600">AC not cooling - Scheduled for 2:00 PM</div>
                <div className="text-xs text-gray-500">10 minutes ago</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium">Smith Residence</div>
                <div className="text-sm text-gray-600">Plumbing inspection requested</div>
                <div className="text-xs text-gray-500">25 minutes ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TechnicianDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Current Assignment</h2>
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Johnson HVAC - AC Unit Repair</h3>
              <p className="text-gray-600">123 Main St, Downtown</p>
              <p className="text-sm text-gray-500">Scheduled: 2:00 PM - 4:00 PM</p>
            </div>
            <Badge>In Progress</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button size="sm">Update Status</Button>
            <Button variant="outline" size="sm">Contact Customer</Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-green-50">
                <div className="font-medium">9:00 AM - Smith Plumbing</div>
                <div className="text-sm text-gray-600">Routine maintenance</div>
                <Badge variant="secondary" className="mt-1">Completed</Badge>
              </div>
              <div className="p-3 border rounded-lg bg-blue-50">
                <div className="font-medium">2:00 PM - Johnson HVAC</div>
                <div className="text-sm text-gray-600">AC unit repair</div>
                <Badge className="mt-1">Current</Badge>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium">4:30 PM - Office Complex</div>
                <div className="text-sm text-gray-600">Electrical inspection</div>
                <Badge variant="outline" className="mt-1">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tools & Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/employees">
                <Button variant="outline" className="h-16 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Time Clock</span>
                  <span className="text-xs text-gray-600">Clock in/out</span>
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" className="h-16 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Work Order</span>
                  <span className="text-xs text-gray-600">Submit forms</span>
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" className="h-16 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Photos</span>
                  <span className="text-xs text-gray-600">Upload images</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="h-16 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Payment</span>
                  <span className="text-xs text-gray-600">Collect payment</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AccountantDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$12,450</div>
            <p className="text-sm text-gray-600">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outstanding AR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">$45,320</div>
            <p className="text-sm text-gray-600">23 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$89,450</div>
            <p className="text-sm text-gray-600">71% of target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">34.2%</div>
            <p className="text-sm text-gray-600">+2.1% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/analytics" className="block p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Financial Reports</div>
                <div className="text-sm text-gray-600">View detailed financial reports</div>
              </Link>
              <Link href="/invoices" className="block p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Invoice Management</div>
                <div className="text-sm text-gray-600">Track and manage invoices</div>
              </Link>
              <Link href="/payroll" className="block p-3 rounded-lg border hover:bg-gray-50">
                <div className="font-medium">Payroll Export</div>
                <div className="text-sm text-gray-600">Export payroll data</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Johnson HVAC</div>
                  <div className="text-sm text-gray-600">Service payment</div>
                </div>
                <div className="text-green-600 font-semibold">+$450</div>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Parts Supplier</div>
                  <div className="text-sm text-gray-600">Equipment purchase</div>
                </div>
                <div className="text-red-600 font-semibold">-$1,200</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SalesDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quotes This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <p className="text-sm text-gray-600">8 pending responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">67%</div>
            <p className="text-sm text-gray-600">Above target of 60%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">$45,200</div>
            <p className="text-sm text-gray-600">Potential revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/quotes/new">
                <Button className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">New Quote</span>
                  <span className="text-xs text-gray-600">Create estimate</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">Follow Up</span>
                  <span className="text-xs text-gray-600">Customer outreach</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Customers</span>
                  <span className="text-xs text-gray-600">View prospects</span>
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" className="h-20 flex flex-col justify-center items-center w-full transition-all hover:shadow-md">
                  <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Reports</span>
                  <span className="text-xs text-gray-600">Sales analytics</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Office Building HVAC</div>
                    <div className="text-sm text-gray-600">$12,500 - Commercial installation</div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Restaurant Kitchen Repair</div>
                    <div className="text-sm text-gray-600">$3,200 - Equipment service</div>
                  </div>
                  <Badge>Accepted</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DefaultDashboard() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ServiceVista AI</h2>
      <p className="text-gray-600 mb-6">Your role-specific dashboard is being prepared.</p>
      <Button>Contact Administrator</Button>
    </div>
  );
} 