'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

// Mock quote data
const mockQuote = {
  id: "QUO-2024-0145",
  customer: "Johnson HVAC Solutions",
  customerEmail: "mike.johnson@johnsonhvac.com",
  customerPhone: "(555) 123-4567",
  project: "Commercial HVAC System Upgrade",
  description: "Complete HVAC system replacement for 5,000 sq ft commercial facility including new units, ductwork, and controls.",
  salesperson: "Jennifer Martinez",
  status: "pending",
  probability: 75,
  totalAmount: 15750,
  validUntil: "2024-02-15",
  createdDate: "2024-01-15",
  followUpDate: "2024-01-22",
  estimatedStartDate: "2024-03-01",
  estimatedDuration: "5 days",
  terms: "Net 30",
  warranty: "2 years parts and labor"
};

const mockLineItems = [
  {
    id: 1,
    description: "5-Ton Commercial HVAC Unit",
    quantity: 2,
    unitPrice: 3500,
    total: 7000,
    category: "Equipment"
  },
  {
    id: 2,
    description: "Ductwork Installation (100 ft)",
    quantity: 1,
    unitPrice: 2500,
    total: 2500,
    category: "Installation"
  },
  {
    id: 3,
    description: "Digital Thermostat Controls",
    quantity: 3,
    unitPrice: 450,
    total: 1350,
    category: "Controls"
  },
  {
    id: 4,
    description: "Labor - Installation & Setup",
    quantity: 40,
    unitPrice: 85,
    total: 3400,
    category: "Labor"
  },
  {
    id: 5,
    description: "Permits & Inspections",
    quantity: 1,
    unitPrice: 750,
    total: 750,
    category: "Permits"
  },
  {
    id: 6,
    description: "System Testing & Commissioning",
    quantity: 1,
    unitPrice: 750,
    total: 750,
    category: "Testing"
  }
];

const mockNotes = [
  {
    id: 1,
    author: "Jennifer Martinez",
    timestamp: "2024-01-15T14:30:00Z",
    content: "Initial quote created after site visit. Customer interested in upgrading efficiency and reducing energy costs."
  },
  {
    id: 2,
    author: "Jennifer Martinez",
    timestamp: "2024-01-18T10:15:00Z",
    content: "Called customer to discuss timeline. They prefer to start after Q1 but before summer season."
  },
  {
    id: 3,
    author: "Mike Johnson",
    timestamp: "2024-01-20T16:45:00Z",
    content: "Customer feedback: Quote looks good, needs approval from facilities manager. Expecting decision by end of week."
  }
];

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [newNote, setNewNote] = useState('');
  
  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const canEdit = () => {
    return ['admin', 'office_manager', 'sales'].includes(user.role);
  };

  const canApprove = () => {
    return ['admin', 'office_manager'].includes(user.role);
  };

  const canAddNotes = () => {
    return user.role !== 'client';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  const subtotal = mockLineItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.0875; // 8.75% tax
  const total = subtotal + tax;

  return (
    <ProtectedLayout requiredModule="quotes">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{mockQuote.id}</h1>
              <Badge className={getStatusColor(mockQuote.status)}>
                {mockQuote.status}
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                {mockQuote.probability}% chance
              </Badge>
            </div>
            <p className="text-gray-600">{mockQuote.project}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/quotes">Back to Quotes</Link>
            </Button>
            {canEdit() && (
              <>
                <Button variant="outline">Send Quote</Button>
                <Button>Edit Quote</Button>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Company:</span> {mockQuote.customer}</div>
                      <div><span className="font-medium">Email:</span> {mockQuote.customerEmail}</div>
                      <div><span className="font-medium">Phone:</span> {mockQuote.customerPhone}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Quote Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Salesperson:</span> {mockQuote.salesperson}</div>
                      <div><span className="font-medium">Created:</span> {mockQuote.createdDate}</div>
                      <div><span className="font-medium">Valid Until:</span> {mockQuote.validUntil}</div>
                      <div><span className="font-medium">Terms:</span> {mockQuote.terms}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Project Description</h4>
                  <p className="text-sm text-gray-600">{mockQuote.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Description</th>
                        <th className="text-center py-2">Qty</th>
                        <th className="text-right py-2">Unit Price</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLineItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3">
                            <div>
                              <div className="font-medium">{item.description}</div>
                              <div className="text-sm text-gray-500">{item.category}</div>
                            </div>
                          </td>
                          <td className="text-center py-3">{item.quantity}</td>
                          <td className="text-right py-3">${item.unitPrice.toLocaleString()}</td>
                          <td className="text-right py-3 font-semibold">${item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (8.75%):</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Estimated Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Start Date:</span> {mockQuote.estimatedStartDate}</div>
                      <div><span className="font-medium">Duration:</span> {mockQuote.estimatedDuration}</div>
                      <div><span className="font-medium">Warranty:</span> {mockQuote.warranty}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Follow-up:</span> {mockQuote.followUpDate}</div>
                      <div className={`font-medium ${getProbabilityColor(mockQuote.probability)}`}>
                        Win Probability: {mockQuote.probability}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button size="sm" className="w-full" variant="outline">Send to Customer</Button>
                  <Button size="sm" className="w-full" variant="outline">Download PDF</Button>
                  <Button size="sm" className="w-full" variant="outline">Duplicate Quote</Button>
                  {canApprove() && (
                    <>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Mark Accepted
                      </Button>
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Mark Rejected
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes & Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  {mockNotes.map((note) => (
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
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
} 