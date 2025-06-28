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

// Mock data for jobs
const mockJobs = [
  {
    id: "JOB-2024-0892",
    customer: "Johnson HVAC",
    customerPhone: "(555) 123-4567",
    service: "AC Unit Repair",
    description: "Central air conditioning not cooling properly. Customer reports warm air blowing from vents.",
    technician: "Mike Rodriguez",
    status: "in_progress",
    priority: "high",
    scheduled: "2:00 PM - 4:00 PM",
    scheduledDate: "2024-01-15",
    location: "123 Main St, Downtown",
    estimatedCost: "$450",
    actualCost: null,
    tags: ["HVAC", "Repair", "Emergency"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:15:00Z"
  },
  {
    id: "JOB-2024-0893",
    customer: "Smith Residence",
    customerPhone: "(555) 234-5678",
    service: "Plumbing Inspection",
    description: "Annual plumbing inspection for home warranty compliance.",
    technician: "Sarah Chen",
    status: "scheduled",
    priority: "normal",
    scheduled: "3:30 PM - 5:00 PM",
    scheduledDate: "2024-01-15",
    location: "456 Oak Ave, Westside",
    estimatedCost: "$150",
    actualCost: null,
    tags: ["Plumbing", "Inspection", "Maintenance"],
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z"
  },
  {
    id: "JOB-2024-0894",
    customer: "Office Complex",
    customerPhone: "(555) 345-6789",
    service: "Electrical Maintenance",
    description: "Quarterly electrical system maintenance and safety inspection.",
    technician: "Unassigned",
    status: "pending",
    priority: "urgent",
    scheduled: "4:00 PM - 6:00 PM",
    scheduledDate: "2024-01-15",
    location: "789 Business Blvd, Business District",
    estimatedCost: "$300",
    actualCost: null,
    tags: ["Electrical", "Maintenance", "Commercial"],
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-01-15T08:45:00Z"
  },
  {
    id: "JOB-2024-0895",
    customer: "Martinez Auto Shop",
    customerPhone: "(555) 456-7890",
    service: "Compressor Repair",
    description: "Air compressor making unusual noises and losing pressure.",
    technician: "Bob Wilson",
    status: "completed",
    priority: "high",
    scheduled: "9:00 AM - 11:00 AM",
    scheduledDate: "2024-01-15",
    location: "321 Industrial Way, South Side",
    estimatedCost: "$350",
    actualCost: "$380",
    tags: ["Automotive", "Repair", "Compressor"],
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-15T11:30:00Z"
  }
];

const technicians = [
  { id: "tech-1", name: "Mike Rodriguez", status: "available" },
  { id: "tech-2", name: "Sarah Chen", status: "on_job" },
  { id: "tech-3", name: "Bob Wilson", status: "available" },
  { id: "tech-4", name: "Lisa Wang", status: "off_duty" }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    // Role-based filtering
    if (user.role === 'technician') {
      return matchesSearch && matchesStatus && matchesPriority && 
             (job.technician === user.name || job.status === 'pending');
    }
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canAssignJobs = () => {
    return ['admin', 'office_manager', 'dispatcher'].includes(user.role);
  };

  const canCreateJobs = () => {
    return ['admin', 'office_manager', 'csr'].includes(user.role);
  };

  const canViewAllJobs = () => {
    return user.role !== 'technician';
  };

  return (
    <ProtectedLayout requiredModule="jobs">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
            <p className="text-gray-600 mt-1">
              {user.role === 'technician' ? 'Your assigned jobs and available work' : 'Manage and track all service jobs'}
            </p>
          </div>
          <div className="flex space-x-3">
            {canCreateJobs() && (
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Job
              </Button>
            )}
            {canAssignJobs() && selectedJobs.length > 0 && (
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Assign ({selectedJobs.length})
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
                  placeholder="Search jobs, customers, or job IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
              </div>
              
              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-4">
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                  <Select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </div>
                
                <div className="relative min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Filter</label>
                  <Select 
                    value={priorityFilter} 
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  >
                    <option value="all">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                  </Select>
                </div>

                {/* Filter Stats */}
                <div className="flex items-end space-x-4 ml-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Showing</p>
                    <p className="text-xl font-bold text-blue-600">{filteredJobs.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">{mockJobs.length}</p>
                  </div>
                  {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setPriorityFilter('all');
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

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900 mt-3">{filteredJobs.length}</p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">In Progress</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">
                    {filteredJobs.filter(job => job.status === 'in_progress').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-3">
                    {filteredJobs.filter(job => job.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Completed</p>
                  <p className="text-2xl font-bold text-gray-600 mt-3">
                    {filteredJobs.filter(job => job.status === 'completed').length}
                  </p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <Card>
          <CardHeader>
            <CardTitle>Jobs List</CardTitle>
            <CardDescription>
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {canAssignJobs() && (
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleJobSelection(job.id)}
                          className="mt-1"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link href={`/jobs/${job.id}`} className="font-semibold text-blue-600 hover:text-blue-800">
                            {job.id}
                          </Link>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(job.priority)}>
                            {job.priority}
                          </Badge>
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-1">{job.customer}</h3>
                        <p className="text-sm text-gray-600 mb-2">{job.service}</p>
                        <p className="text-sm text-gray-500 mb-3">{job.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Technician:</span>
                            <p>{job.technician || 'Unassigned'}</p>
                          </div>
                          <div>
                            <span className="font-medium">Scheduled:</span>
                            <p>{job.scheduled}</p>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>
                            <p>{job.location}</p>
                          </div>
                          <div>
                            <span className="font-medium">Estimated Cost:</span>
                            <p>{job.estimatedCost}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/jobs/${job.id}`}>View</Link>
                      </Button>
                      {user.role === 'technician' && job.technician === user.name && (
                        <Button size="sm">
                          Update Status
                        </Button>
                      )}
                      {canAssignJobs() && job.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 