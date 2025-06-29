'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data for demonstration
const upcomingServices = [
  {
    id: 1,
    service: "HVAC Maintenance e",
    date: "Dec 28, 2024",
    time: "2:00 PM - 4:00 PM",
    technician: "Mike Rodriguez",
    status: "confirmed"
  },
  {
    id: 2,
    service: "Plumbing Inspection",
    date: "Jan 5, 2025",
    time: "10:00 AM - 12:00 PM",
    technician: "Sarah Chen",
    status: "scheduled"
  }
];

const recentServices = [
  {
    id: 1,
    service: "AC Repair",
    date: "Dec 15, 2024",
    technician: "John Smith",
    status: "completed",
    rating: 5,
    total: "$285.00"
  },
  {
    id: 2,
    service: "Electrical Outlet Installation",
    date: "Nov 28, 2024",
    technician: "Lisa Wang",
    status: "completed",
    rating: 4,
    total: "$150.00"
  }
];

const invoices = [
  {
    id: "INV-2024-1205",
    date: "Dec 15, 2024",
    service: "AC Repair",
    amount: "$285.00",
    status: "paid"
  },
  {
    id: "INV-2024-1128",
    date: "Nov 28, 2024",
    service: "Electrical Work",
    amount: "$150.00",
    status: "paid"
  },
  {
    id: "INV-2024-1015",
    date: "Oct 15, 2024",
    service: "HVAC Maintenance",
    amount: "$120.00",
    status: "overdue"
  }
];

export default function ClientPortal() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-900">
                  ServiceVista <span className="text-blue-600">AI</span>
                </span>
              </Link>
              <Badge variant="outline">Client Portal</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome back, John!</span>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Service Dashboard</h1>
          <p className="text-slate-600">Manage your appointments, view service history, and stay updated on your account.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button className="h-auto p-4 flex flex-col items-center space-y-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Schedule Service</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Contact Support</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Invoices</span>
          </Button>
          
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile Settings</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Services */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Upcoming Services</span>
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{service.service}</h4>
                      <p className="text-sm text-slate-600">{service.date} • {service.time}</p>
                      <p className="text-sm text-slate-500">Technician: {service.technician}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={service.status === 'confirmed' ? 'success' : 'secondary'}>
                        {service.status}
                      </Badge>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Recent Services</span>
                </CardTitle>
                <CardDescription>Your completed service history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{service.service}</h4>
                      <p className="text-sm text-slate-600">{service.date} • {service.technician}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < service.rating ? 'fill-current' : 'text-slate-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-slate-500 ml-2">({service.rating}/5)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{service.total}</p>
                      <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Account Summary & Quick Info */}
          <div className="space-y-6">
            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Services</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">This Year</span>
                  <span className="font-semibold">$2,840</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Next Service</span>
                  <span className="font-semibold text-blue-600">Dec 28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Member Since</span>
                  <span className="font-semibold">Jan 2022</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Invoices</span>
                  <Button variant="outline" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-slate-900">{invoice.id}</p>
                      <p className="text-sm text-slate-600">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{invoice.amount}</p>
                      <Badge variant={invoice.status === 'paid' ? 'success' : invoice.status === 'overdue' ? 'destructive' : 'secondary'}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Need Help?</CardTitle>
                <CardDescription className="text-blue-700">
                  Our customer support team is here to assist you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Support
                  </Button>
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 