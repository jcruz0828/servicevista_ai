'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock data for customers
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Johnson HVAC",
    type: "Commercial",
    contact: "Mike Johnson",
    email: "mike@johnsonhvac.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Downtown",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    status: "Active",
    totalJobs: 15,
    totalRevenue: "$12,450",
    lastService: "2024-01-15",
    preferredTech: "Mike Rodriguez",
    tags: ["HVAC", "Commercial", "Priority"],
    notes: "Large commercial client. Prefers morning appointments.",
    createdAt: "2023-06-15",
    rating: 4.8
  },
  {
    id: "CUST-002",
    name: "Smith Residence",
    type: "Residential",
    contact: "Sarah Smith",
    email: "sarah.smith@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Westside",
    city: "Springfield",
    state: "IL",
    zip: "62702",
    status: "Active",
    totalJobs: 8,
    totalRevenue: "$3,200",
    lastService: "2024-01-10",
    preferredTech: "Sarah Chen",
    tags: ["Plumbing", "Residential"],
    notes: "Has elderly residents. Gentle approach required.",
    createdAt: "2023-03-22",
    rating: 5.0
  },
  {
    id: "CUST-003",
    name: "Office Complex LLC",
    type: "Commercial",
    contact: "David Brown",
    email: "dbrown@officecomplex.com",
    phone: "(555) 345-6789",
    address: "789 Business Blvd, Business District",
    city: "Springfield",
    state: "IL",
    zip: "62703",
    status: "Active",
    totalJobs: 23,
    totalRevenue: "$18,750",
    lastService: "2024-01-12",
    preferredTech: null,
    tags: ["Electrical", "Commercial", "Maintenance"],
    notes: "Quarterly maintenance contract. Access requires security clearance.",
    createdAt: "2022-11-08",
    rating: 4.6
  },
  {
    id: "CUST-004",
    name: "Martinez Auto Shop",
    type: "Commercial",
    contact: "Carlos Martinez",
    email: "carlos@martinezauto.com",
    phone: "(555) 456-7890",
    address: "321 Industrial Way, South Side",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    status: "Active",
    totalJobs: 12,
    totalRevenue: "$8,900",
    lastService: "2024-01-08",
    preferredTech: "Bob Wilson",
    tags: ["Automotive", "Commercial", "Equipment"],
    notes: "Specializes in automotive equipment repair. Very knowledgeable.",
    createdAt: "2023-01-15",
    rating: 4.9
  },
  {
    id: "CUST-005",
    name: "Wilson Family",
    type: "Residential",
    contact: "Jennifer Wilson",
    email: "jwilson@email.com",
    phone: "(555) 567-8901",
    address: "654 Pine St, Northside",
    city: "Springfield",
    state: "IL",
    zip: "62705",
    status: "Inactive",
    totalJobs: 3,
    totalRevenue: "$450",
    lastService: "2023-08-20",
    preferredTech: null,
    tags: ["Residential", "Plumbing"],
    notes: "Moved out of area. Keep contact for referrals.",
    createdAt: "2023-05-10",
    rating: 4.2
  }
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Residential': return 'bg-blue-100 text-blue-800';
      case 'Commercial': return 'bg-purple-100 text-purple-800';
      case 'Industrial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canCreateCustomers = () => {
    return ['admin', 'office_manager', 'csr'].includes(user.role);
  };

  const canViewAllCustomers = () => {
    return user.role !== 'technician';
  };

  const canEditCustomers = () => {
    return ['admin', 'office_manager', 'csr'].includes(user.role);
  };

  return (
    <ProtectedLayout requiredModule="customers">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600 mt-1">
              {user.role === 'sales' ? 'Manage prospects and customer relationships' : 'Customer database and contact management'}
            </p>
          </div>
          <div className="flex space-x-3">
            {canCreateCustomers() && (
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Customer
              </Button>
            )}
            {selectedCustomers.length > 0 && (
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Export ({selectedCustomers.length})
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6 shadow-sm border-0 bg-gradient-to-r from-gray-50 to-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input
                  placeholder="Search customers, contacts, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
              </div>
              
              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-4">
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
                  <Select 
                    value={typeFilter} 
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="all">All Types</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </Select>
                </div>
                
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                  <Select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Prospect">Prospect</option>
                  </Select>
                </div>

                {/* Filter Stats */}
                <div className="flex items-end space-x-4 ml-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Showing</p>
                    <p className="text-xl font-bold text-blue-600">{filteredCustomers.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">{mockCustomers.length}</p>
                  </div>
                  {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setTypeFilter('all');
                        setStatusFilter('all');
                      }}
                      className="h-11 px-4"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900 mt-3">{filteredCustomers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Active</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">
                    {filteredCustomers.filter(customer => customer.status === 'Active').length}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Commercial</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">
                    {filteredCustomers.filter(customer => customer.type === 'Commercial').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                  <p className="text-2xl font-bold text-yellow-600 mt-3">
                    {(filteredCustomers.reduce((sum, customer) => sum + customer.rating, 0) / filteredCustomers.length || 0).toFixed(1)}
                  </p>
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

        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle>Customers List</CardTitle>
            <CardDescription>
              {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleCustomerSelection(customer.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link href={`/customers/${customer.id}`} className="font-semibold text-blue-600 hover:text-blue-800">
                            {customer.name}
                          </Link>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                          <Badge className={getTypeColor(customer.type)}>
                            {customer.type}
                          </Badge>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(customer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-600">({customer.rating})</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Contact:</span>
                            <p>{customer.contact}</p>
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>
                            <p>{customer.phone}</p>
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>
                            <p className="truncate">{customer.email}</p>
                          </div>
                          <div>
                            <span className="font-medium">Total Jobs:</span>
                            <p>{customer.totalJobs}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Address:</span>
                            <p>{customer.address}</p>
                          </div>
                          <div>
                            <span className="font-medium">Total Revenue:</span>
                            <p className="text-green-600 font-semibold">{customer.totalRevenue}</p>
                          </div>
                          <div>
                            <span className="font-medium">Last Service:</span>
                            <p>{customer.lastService}</p>
                          </div>
                          <div>
                            <span className="font-medium">Preferred Tech:</span>
                            <p>{customer.preferredTech || 'None'}</p>
                          </div>
                        </div>

                        {customer.notes && (
                          <div className="mb-3">
                            <span className="font-medium text-sm text-gray-600">Notes:</span>
                            <p className="text-sm text-gray-600 mt-1">{customer.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/customers/${customer.id}`}>View</Link>
                      </Button>
                      {canEditCustomers() && (
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      )}
                      {canCreateCustomers() && (
                        <Button size="sm">
                          New Job
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCustomers.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  {canCreateCustomers() && (
                    <Button className="mt-4">
                      Add Your First Customer
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 