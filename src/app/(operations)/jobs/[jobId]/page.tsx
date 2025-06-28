'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock job data
const mockJob = {
  id: "JOB-2024-0892",
  customer: "Johnson HVAC",
  customerPhone: "(555) 123-4567",
  customerEmail: "mike@johnsonhvac.com",
  service: "AC Unit Repair",
  description: "Central air conditioning not cooling properly. Customer reports warm air blowing from vents. Unit appears to be low on refrigerant.",
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
  updatedAt: "2024-01-15T14:15:00Z",
  notes: [
    {
      id: 1,
      author: "Lisa CSR",
      timestamp: "2024-01-15T10:30:00Z",
      content: "Customer called reporting AC not cooling. Scheduled emergency appointment."
    },
    {
      id: 2,
      author: "Mike Dispatcher",
      timestamp: "2024-01-15T11:00:00Z",
      content: "Assigned to Mike Rodriguez. Customer priority - commercial client."
    },
    {
      id: 3,
      author: "Mike Rodriguez",
      timestamp: "2024-01-15T14:15:00Z",
      content: "On-site. Checking refrigerant levels and compressor operation."
    }
  ],
  timeEntries: [
    {
      id: 1,
      technician: "Mike Rodriguez",
      startTime: "2024-01-15T14:00:00Z",
      endTime: null,
      description: "AC unit diagnosis and repair"
    }
  ],
  parts: [
    {
      id: 1,
      name: "R-410A Refrigerant",
      quantity: 2,
      unitCost: 45,
      total: 90
    }
  ],
  photos: [
    {
      id: 1,
      filename: "unit_before.jpg",
      description: "AC unit before service",
      uploadedBy: "Mike Rodriguez",
      timestamp: "2024-01-15T14:15:00Z"
    }
  ]
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [newNote, setNewNote] = useState('');
  const [jobStatus, setJobStatus] = useState(mockJob.status);

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const canUpdateStatus = () => {
    return user.role === 'technician' && mockJob.technician === user.name ||
           ['admin', 'office_manager', 'dispatcher'].includes(user.role);
  };

  const canAddNotes = () => {
    return user.role !== 'client';
  };

  const canViewFinancials = () => {
    return ['admin', 'office_manager', 'accountant'].includes(user.role);
  };

  const handleStatusUpdate = () => {
    // Mock status update
    console.log('Updating status to:', jobStatus);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Mock adding note
      console.log('Adding note:', newNote);
      setNewNote('');
    }
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

  return (
    <ProtectedLayout requiredModule="jobs">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{mockJob.id}</h1>
              <Badge className={getStatusColor(mockJob.status)}>
                {mockJob.status.replace('_', ' ')}
              </Badge>
              <Badge className={getPriorityColor(mockJob.priority)}>
                {mockJob.priority}
              </Badge>
            </div>
            <p className="text-gray-600">{mockJob.service} - {mockJob.customer}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/jobs">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Jobs
              </Link>
            </Button>
            {canUpdateStatus() && (
              <Button>
                Update Status
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{mockJob.customer}</span>
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>
                        <span className="ml-2">{mockJob.customerPhone}</span>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">{mockJob.customerEmail}</span>
                      </div>
                      <div>
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{mockJob.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Service Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Service:</span>
                        <span className="ml-2">{mockJob.service}</span>
                      </div>
                      <div>
                        <span className="font-medium">Technician:</span>
                        <span className="ml-2">{mockJob.technician}</span>
                      </div>
                      <div>
                        <span className="font-medium">Scheduled:</span>
                        <span className="ml-2">{mockJob.scheduled}</span>
                      </div>
                      {canViewFinancials() && (
                        <div>
                          <span className="font-medium">Estimated Cost:</span>
                          <span className="ml-2">{mockJob.estimatedCost}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{mockJob.description}</p>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {mockJob.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Update */}
            {canUpdateStatus() && (
              <Card>
                <CardHeader>
                  <CardTitle>Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <select 
                      value={jobStatus} 
                      onChange={(e) => setJobStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button onClick={handleStatusUpdate}>
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Parts & Materials */}
            {canViewFinancials() && (
              <Card>
                <CardHeader>
                  <CardTitle>Parts & Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockJob.parts.map((part) => (
                      <div key={part.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{part.name}</div>
                          <div className="text-sm text-gray-600">Qty: {part.quantity} × ${part.unitCost}</div>
                        </div>
                        <div className="font-semibold">${part.total}</div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 border-t font-semibold">
                      <span>Total Parts:</span>
                      <span>${mockJob.parts.reduce((sum, part) => sum + part.total, 0)}</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-4" variant="outline">
                    Add Parts
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Time Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockJob.timeEntries.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{entry.technician}</div>
                        <div className="text-sm text-gray-600">{entry.description}</div>
                        <div className="text-sm text-gray-500">
                          Started: {new Date(entry.startTime).toLocaleTimeString()}
                          {entry.endTime && ` - Ended: ${new Date(entry.endTime).toLocaleTimeString()}`}
                        </div>
                      </div>
                      {!entry.endTime && user.role === 'technician' && (
                        <Button size="sm">
                          Clock Out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {user.role === 'technician' && (
                  <Button size="sm" className="mt-4" variant="outline">
                    Clock In
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button size="sm" className="w-full" variant="outline">
                    Call Customer
                  </Button>
                  <Button size="sm" className="w-full" variant="outline">
                    Send Update
                  </Button>
                  <Button size="sm" className="w-full" variant="outline">
                    Get Directions
                  </Button>
                  {user.role === 'technician' && (
                    <Button size="sm" className="w-full">
                      Upload Photo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {mockJob.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{note.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
                
                {canAddNotes() && (
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border rounded-lg text-sm"
                      rows={3}
                      placeholder="Add a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                      Add Note
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockJob.photos.map((photo) => (
                    <div key={photo.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{photo.filename}</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">{photo.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        By {photo.uploadedBy} • {new Date(photo.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                {user.role === 'technician' && (
                  <Button size="sm" className="mt-4 w-full" variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Photo
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
} 