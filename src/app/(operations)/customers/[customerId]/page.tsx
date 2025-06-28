'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock customer data
const mockCustomer = {
  id: "CUST-2024-0123",
  name: "Johnson HVAC Solutions",
  type: "Commercial",
  email: "mike.johnson@johnsonhvac.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Downtown, CA 90210",
  contactPerson: "Mike Johnson",
  accountStatus: "Active",
  totalJobs: 28,
  lifetimeValue: 45800,
  lastService: "2024-01-12"
};

const mockJobHistory = [
  {
    id: "JOB-2024-0892",
    date: "2024-01-12",
    service: "AC Unit Repair",
    technician: "Mike Rodriguez",
    status: "completed",
    cost: 450
  },
  {
    id: "JOB-2024-0856",
    date: "2024-01-05",
    service: "Preventive Maintenance", 
    technician: "Sarah Chen",
    status: "completed",
    cost: 180
  },
  {
    id: "JOB-2024-0890",
    date: "2024-01-15",
    service: "Duct Cleaning",
    technician: "Tom Wilson",
    status: "scheduled",
    cost: 320
  }
];

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const canEdit = () => {
    return ['admin', 'office_manager', 'customer_service'].includes(user.role);
  };

  const canViewFinancials = () => {
    return ['admin', 'office_manager', 'accountant'].includes(user.role);
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

  return (
    <ProtectedLayout requiredModule="customers">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{mockCustomer.name}</h1>
              <Badge className="bg-blue-100 text-blue-800">{mockCustomer.type}</Badge>
            </div>
            <p className="text-gray-600">{mockCustomer.id}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/customers">Back to Customers</Link>
            </Button>
            {canEdit() && (
              <Button>Edit Customer</Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Contact:</span> {mockCustomer.contactPerson}</div>
                      <div><span className="font-medium">Email:</span> {mockCustomer.email}</div>
                      <div><span className="font-medium">Phone:</span> {mockCustomer.phone}</div>
                      <div><span className="font-medium">Address:</span> {mockCustomer.address}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Status:</span> {mockCustomer.accountStatus}</div>
                      <div><span className="font-medium">Total Jobs:</span> {mockCustomer.totalJobs}</div>
                      {canViewFinancials() && (
                        <div><span className="font-medium">Lifetime Value:</span> ${mockCustomer.lifetimeValue.toLocaleString()}</div>
                      )}
                      <div><span className="font-medium">Last Service:</span> {mockCustomer.lastService}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobHistory.map((job) => (
                    <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <Link href={`/jobs/${job.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                          {job.id}
                        </Link>
                        <div className="text-sm text-gray-600">{job.service} • {job.technician}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">${job.cost} • {job.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button size="sm" className="w-full" variant="outline">Call Customer</Button>
                  <Button size="sm" className="w-full" variant="outline">Send Email</Button>
                  <Button size="sm" className="w-full" variant="outline">Schedule Service</Button>
                  <Button size="sm" className="w-full" variant="outline">Create Quote</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
} 