'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';

// Mock employees data
const mockEmployees = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@servicevista.com',
    phone: '(555) 123-4567',
    role: 'admin',
    department: 'Management',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: '/api/placeholder/150/150',
    skills: ['Leadership', 'Project Management', 'Strategic Planning'],
    rating: 4.9,
    completedJobs: 0,
    reviews: [
      { id: '1', reviewer: 'CEO', rating: 5, comment: 'Excellent leadership and strategic vision.', date: '2024-01-10' },
      { id: '2', reviewer: 'Office Manager', rating: 5, comment: 'Great at coordinating teams and projects.', date: '2024-01-05' }
    ]
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@servicevista.com',
    phone: '(555) 234-5678',
    role: 'office_manager',
    department: 'Operations',
    status: 'active',
    joinDate: '2023-02-20',
    avatar: '/api/placeholder/150/150',
    skills: ['Operations Management', 'Customer Service', 'Scheduling'],
    rating: 4.8,
    completedJobs: 0,
    reviews: [
      { id: '3', reviewer: 'Admin', rating: 5, comment: 'Exceptional at managing daily operations.', date: '2024-01-12' },
      { id: '4', reviewer: 'Customer', rating: 4, comment: 'Very helpful and responsive.', date: '2024-01-08' }
    ]
  },
  {
    id: '3',
    name: 'Mike Dispatcher',
    email: 'mike@servicevista.com',
    phone: '(555) 345-6789',
    role: 'dispatcher',
    department: 'Operations',
    status: 'active',
    joinDate: '2023-03-10',
    avatar: '/api/placeholder/150/150',
    skills: ['Dispatch Management', 'Route Optimization', 'Communication'],
    rating: 4.7,
    completedJobs: 0,
    reviews: [
      { id: '5', reviewer: 'Technician', rating: 5, comment: 'Great at coordinating schedules and routes.', date: '2024-01-15' },
      { id: '6', reviewer: 'Office Manager', rating: 4, comment: 'Efficient and reliable dispatcher.', date: '2024-01-03' }
    ]
  },
  {
    id: '4',
    name: 'Lisa CSR',
    email: 'lisa@servicevista.com',
    phone: '(555) 456-7890',
    role: 'csr',
    department: 'Customer Service',
    status: 'active',
    joinDate: '2023-04-05',
    avatar: '/api/placeholder/150/150',
    skills: ['Customer Service', 'Phone Support', 'Problem Solving'],
    rating: 4.6,
    completedJobs: 0,
    reviews: [
      { id: '7', reviewer: 'Customer', rating: 5, comment: 'Excellent customer service skills.', date: '2024-01-14' },
      { id: '8', reviewer: 'Supervisor', rating: 4, comment: 'Professional and courteous.', date: '2024-01-06' }
    ]
  },
  {
    id: '5',
    name: 'Bob Technician',
    email: 'bob@servicevista.com',
    phone: '(555) 567-8901',
    role: 'technician',
    department: 'Field Service',
    status: 'active',
    joinDate: '2023-05-12',
    avatar: '/api/placeholder/150/150',
    skills: ['HVAC Repair', 'Electrical Work', 'Plumbing', 'Diagnostics'],
    rating: 4.9,
    completedJobs: 156,
    reviews: [
      { id: '9', reviewer: 'Customer', rating: 5, comment: 'Fixed my AC perfectly and explained everything clearly.', date: '2024-01-16' },
      { id: '10', reviewer: 'Customer', rating: 5, comment: 'Professional, punctual, and skilled technician.', date: '2024-01-13' },
      { id: '11', reviewer: 'Dispatcher', rating: 5, comment: 'Always reliable and communicates well.', date: '2024-01-09' }
    ]
  },
  {
    id: '6',
    name: 'Mary Accountant',
    email: 'mary@servicevista.com',
    phone: '(555) 678-9012',
    role: 'accountant',
    department: 'Finance',
    status: 'active',
    joinDate: '2023-06-01',
    avatar: '/api/placeholder/150/150',
    skills: ['Accounting', 'Financial Analysis', 'Reporting', 'Payroll'],
    rating: 4.8,
    completedJobs: 0,
    reviews: [
      { id: '12', reviewer: 'Admin', rating: 5, comment: 'Meticulous with financial records and reporting.', date: '2024-01-11' },
      { id: '13', reviewer: 'Office Manager', rating: 4, comment: 'Handles payroll efficiently.', date: '2024-01-07' }
    ]
  },
  {
    id: '7',
    name: 'Tom Sales',
    email: 'tom@servicevista.com',
    phone: '(555) 789-0123',
    role: 'sales',
    department: 'Sales',
    status: 'active',
    joinDate: '2023-07-15',
    avatar: '/api/placeholder/150/150',
    skills: ['Sales', 'Customer Relations', 'Lead Generation', 'Proposals'],
    rating: 4.7,
    completedJobs: 0,
    reviews: [
      { id: '14', reviewer: 'Customer', rating: 5, comment: 'Provided excellent proposal and follow-up.', date: '2024-01-17' },
      { id: '15', reviewer: 'Manager', rating: 4, comment: 'Consistently meets sales targets.', date: '2024-01-04' }
    ]
  }
];

export default function EmployeesPage() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    reviewer: ''
  });

  const user = AuthService.getCurrentUser();
  if (!user) {
    return (
      <ProtectedLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access employee management.</p>
        </div>
      </ProtectedLayout>
    );
  }

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesRole && matchesDepartment && matchesStatus && matchesSearch;
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedDepartment('all');
    setSelectedStatus('all');
  };

  // Helper function to format text for display
  const formatDisplayText = (text: string): string => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleAddReview = () => {
    if (selectedEmployee && newReview.comment.trim()) {
      console.log('Adding review for employee:', selectedEmployee, newReview);
      setShowAddReview(false);
      setNewReview({ rating: 5, comment: '', reviewer: '' });
      setSelectedEmployee(null);
    }
  };

  const departments = [...new Set(mockEmployees.map(emp => emp.department))];
  const roles = [...new Set(mockEmployees.map(emp => emp.role))];

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="text-gray-600 mt-2">Manage employees, reviews, and performance tracking</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </Button>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Employees</p>
                  <p className="text-2xl font-bold text-blue-600 mt-3">{filteredEmployees.length}</p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Active Technicians</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">
                    {filteredEmployees.filter(emp => emp.role === 'technician' && emp.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Avg Rating</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">
                    {(filteredEmployees.reduce((sum, emp) => sum + emp.rating, 0) / filteredEmployees.length).toFixed(1)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Completed Jobs</p>
                  <p className="text-2xl font-bold text-orange-600 mt-3">
                    {filteredEmployees.reduce((sum, emp) => sum + emp.completedJobs, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 hover:shadow-lg transition-shadow">
          <CardContent className="px-8 py-6">
            <div className="mb-6 mt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Employee Filters
                </h3>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  Showing {filteredEmployees.length} of {mockEmployees.length} employees
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Search Employees</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Input
                      placeholder="Search name, email, skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {formatDisplayText(role)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full h-9"
                    onClick={clearFilters}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear
                  </Button>
                </div>
              </div>

              {/* Filter Summary */}
              <div className="mt-6 flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedRole !== 'all' && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Role: {formatDisplayText(selectedRole)}
                  </Badge>
                )}
                {selectedDepartment !== 'all' && (
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Department: {selectedDepartment}
                  </Badge>
                )}
                {selectedStatus !== 'all' && (
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Status: {formatDisplayText(selectedStatus)}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="px-8 py-6">
                <div className="mt-4">
                  {/* Employee Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getRoleColor(employee.role)} variant="secondary">
                          {formatDisplayText(employee.role)}
                        </Badge>
                        <Badge className={getStatusColor(employee.status)} variant="secondary">
                          {formatDisplayText(employee.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Employee Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{employee.rating}</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{employee.completedJobs}</div>
                      <div className="text-xs text-gray-500">Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{employee.reviews.length}</div>
                      <div className="text-xs text-gray-500">Reviews</div>
                    </div>
                  </div>

                  {/* Employee Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{employee.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{employee.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium">{new Date(employee.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {employee.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{employee.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedEmployee(employee.id);
                        setNewReview({ ...newReview, reviewer: user.name });
                        setShowAddReview(true);
                      }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Add Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Add Employee Review</CardTitle>
                <CardDescription>
                  Provide feedback for {mockEmployees.find(e => e.id === selectedEmployee)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Write your review..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddReview(false);
                      setSelectedEmployee(null);
                      setNewReview({ rating: 5, comment: '', reviewer: '' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddReview}>
                    Add Review
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