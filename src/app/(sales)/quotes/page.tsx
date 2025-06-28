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

// Mock data for quotes
const mockQuotes = [
  {
    id: "QUO-2024-001",
    customer: "Johnson HVAC",
    customerContact: "Mike Johnson",
    customerEmail: "mike@johnsonhvac.com",
    customerPhone: "(555) 123-4567",
    service: "Commercial HVAC Installation",
    description: "Complete HVAC system installation for new office building including ductwork, units, and controls.",
    status: "pending",
    amount: "$25,500",
    validUntil: "2024-02-15",
    sentDate: "2024-01-15",
    createdBy: "Tom Sales",
    followUpDate: "2024-01-22",
    probability: 75,
    items: [
      { name: "HVAC Unit - Commercial Grade", quantity: 2, unitPrice: 8500, total: 17000 },
      { name: "Ductwork Installation", quantity: 1, unitPrice: 4500, total: 4500 },
      { name: "Control System Setup", quantity: 1, unitPrice: 2000, total: 2000 },
      { name: "Labor & Installation", quantity: 40, unitPrice: 50, total: 2000 }
    ],
    tags: ["Commercial", "HVAC", "Installation"],
    notes: "Client is comparing with two other vendors. Price is competitive.",
    createdAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "QUO-2024-002",
    customer: "Smith Residence",
    customerContact: "Sarah Smith",
    customerEmail: "sarah.smith@email.com",
    customerPhone: "(555) 234-5678",
    service: "Bathroom Plumbing Renovation",
    description: "Complete bathroom plumbing renovation including new fixtures, pipes, and water heater connection.",
    status: "accepted",
    amount: "$3,200",
    validUntil: "2024-02-01",
    sentDate: "2024-01-10",
    acceptedDate: "2024-01-12",
    createdBy: "Tom Sales",
    followUpDate: null,
    probability: 100,
    items: [
      { name: "Plumbing Fixtures Set", quantity: 1, unitPrice: 1200, total: 1200 },
      { name: "Pipe Installation", quantity: 1, unitPrice: 800, total: 800 },
      { name: "Water Heater Connection", quantity: 1, unitPrice: 400, total: 400 },
      { name: "Labor", quantity: 20, unitPrice: 40, total: 800 }
    ],
    tags: ["Residential", "Plumbing", "Renovation"],
    notes: "Customer was very pleased with our previous work. Quick acceptance.",
    createdAt: "2024-01-10T14:30:00Z"
  },
  {
    id: "QUO-2024-003",
    customer: "Martinez Auto Shop",
    customerContact: "Carlos Martinez",
    customerEmail: "carlos@martinezauto.com",
    customerPhone: "(555) 456-7890",
    service: "Industrial Compressor System",
    description: "Heavy-duty air compressor system with backup unit and automatic switching for automotive shop.",
    status: "rejected",
    amount: "$15,750",
    validUntil: "2024-01-30",
    sentDate: "2024-01-08",
    rejectedDate: "2024-01-14",
    rejectionReason: "Budget constraints",
    createdBy: "Tom Sales",
    followUpDate: "2024-03-01",
    probability: 0,
    items: [
      { name: "Primary Compressor Unit", quantity: 1, unitPrice: 8500, total: 8500 },
      { name: "Backup Compressor", quantity: 1, unitPrice: 4500, total: 4500 },
      { name: "Automatic Switch System", quantity: 1, unitPrice: 1500, total: 1500 },
      { name: "Installation & Setup", quantity: 25, unitPrice: 50, total: 1250 }
    ],
    tags: ["Commercial", "Automotive", "Equipment"],
    notes: "Client interested but over budget. Follow up in Q2 for potential scaled-down version.",
    createdAt: "2024-01-08T11:15:00Z"
  },
  {
    id: "QUO-2024-004",
    customer: "Green Valley Apartments",
    customerContact: "Lisa Park",
    customerEmail: "lisa@greenvalley.com",
    customerPhone: "(555) 678-9012",
    service: "Electrical Panel Upgrade",
    description: "Upgrade electrical panels for 12-unit apartment complex to meet current code requirements.",
    status: "in_review",
    amount: "$18,900",
    validUntil: "2024-02-20",
    sentDate: "2024-01-12",
    createdBy: "Tom Sales",
    followUpDate: "2024-01-19",
    probability: 60,
    items: [
      { name: "Electrical Panels", quantity: 12, unitPrice: 850, total: 10200 },
      { name: "Wiring & Components", quantity: 1, unitPrice: 3200, total: 3200 },
      { name: "Code Compliance Inspection", quantity: 1, unitPrice: 500, total: 500 },
      { name: "Electrician Labor", quantity: 100, unitPrice: 50, total: 5000 }
    ],
    tags: ["Commercial", "Electrical", "Upgrade"],
    notes: "Property manager reviewing with building owner. Expecting decision by end of month.",
    createdAt: "2024-01-12T16:45:00Z"
  }
];

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const filteredQuotes = mockQuotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.customerContact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    if (probability >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const canCreateQuotes = () => {
    return ['admin', 'office_manager', 'sales'].includes(user.role);
  };

  const canSendQuotes = () => {
    return ['admin', 'office_manager', 'sales'].includes(user.role);
  };

  const totalQuoteValue = filteredQuotes.reduce((sum, quote) => 
    sum + parseFloat(quote.amount.replace('$', '').replace(',', '')), 0
  );

  const pipelineValue = filteredQuotes
    .filter(quote => ['pending', 'in_review'].includes(quote.status))
    .reduce((sum, quote) => 
      sum + (parseFloat(quote.amount.replace('$', '').replace(',', '')) * quote.probability / 100), 0
    );

  return (
    <ProtectedLayout requiredModule="quotes">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quotes & Proposals</h1>
            <p className="text-gray-600 mt-1">Create and manage customer quotes and proposals</p>
          </div>
          <div className="flex space-x-3">
            {canCreateQuotes() && (
              <Button asChild>
                <Link href="/quotes/new">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Quote
                </Link>
              </Button>
            )}
            {selectedQuotes.length > 0 && (
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Export ({selectedQuotes.length})
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
                  placeholder="Search quotes, customers, services..."
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
                    <option value="in_review">In Review</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                  </Select>
                </div>

                {/* Filter Stats */}
                <div className="flex items-end space-x-4 ml-auto">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Showing</p>
                    <p className="text-xl font-bold text-blue-600">{filteredQuotes.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold text-gray-900">{mockQuotes.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Pipeline</p>
                    <p className="text-xl font-bold text-purple-600">${Math.round(pipelineValue).toLocaleString()}</p>
                  </div>
                  {(searchTerm || statusFilter !== 'all') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
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

        {/* Quote Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-3">{filteredQuotes.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Value</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">
                    ${totalQuoteValue.toLocaleString()}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Pipeline Value</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">
                    ${Math.round(pipelineValue).toLocaleString()}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Win Rate</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-3">
                    {Math.round((filteredQuotes.filter(q => q.status === 'accepted').length / filteredQuotes.length) * 100) || 0}%
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes List */}
        <Card>
          <CardHeader>
            <CardTitle>Quotes List</CardTitle>
            <CardDescription>
              {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(quote.id)}
                        onChange={() => handleQuoteSelection(quote.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link href={`/quotes/${quote.id}`} className="font-semibold text-blue-600 hover:text-blue-800">
                            {quote.id}
                          </Link>
                          <Badge className={getStatusColor(quote.status)}>
                            {quote.status.replace('_', ' ')}
                          </Badge>
                          <span className={`text-sm font-medium ${getProbabilityColor(quote.probability)}`}>
                            {quote.probability}% probability
                          </span>
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-1">{quote.customer}</h3>
                        <p className="text-sm text-gray-600 mb-2">{quote.service}</p>
                        <p className="text-sm text-gray-500 mb-3">{quote.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Contact:</span>
                            <p>{quote.customerContact}</p>
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span>
                            <p className="text-green-600 font-semibold">{quote.amount}</p>
                          </div>
                          <div>
                            <span className="font-medium">Valid Until:</span>
                            <p>{quote.validUntil}</p>
                          </div>
                          <div>
                            <span className="font-medium">Created By:</span>
                            <p>{quote.createdBy}</p>
                          </div>
                        </div>

                        {quote.followUpDate && (
                          <div className="mb-3 text-sm">
                            <span className="font-medium text-gray-600">Follow Up:</span>
                            <span className="ml-2 text-orange-600">{quote.followUpDate}</span>
                          </div>
                        )}

                        {quote.rejectionReason && (
                          <div className="mb-3 text-sm">
                            <span className="font-medium text-gray-600">Rejection Reason:</span>
                            <span className="ml-2 text-red-600">{quote.rejectionReason}</span>
                          </div>
                        )}

                        {quote.notes && (
                          <div className="mb-3">
                            <span className="font-medium text-sm text-gray-600">Notes:</span>
                            <p className="text-sm text-gray-600 mt-1">{quote.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {quote.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/quotes/${quote.id}`}>View</Link>
                      </Button>
                      {canSendQuotes() && quote.status === 'pending' && (
                        <Button size="sm">
                          Send
                        </Button>
                      )}
                      {canCreateQuotes() && (
                        <Button size="sm" variant="outline">
                          Duplicate
                        </Button>
                      )}
                      {quote.status === 'accepted' && (
                        <Button size="sm">
                          Create Job
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredQuotes.length === 0 && (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  {canCreateQuotes() && (
                    <Button className="mt-4" asChild>
                      <Link href="/quotes/new">Create Your First Quote</Link>
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