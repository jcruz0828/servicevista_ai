'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import Link from 'next/link';

const mockCustomers = [
  { id: "CUST-2024-0123", name: "Johnson HVAC Solutions", type: "Commercial" },
  { id: "CUST-2024-0098", name: "Smith Residential Services", type: "Residential" },
  { id: "CUST-2024-0156", name: "Metro Industrial Complex", type: "Industrial" }
];

export default function NewQuotePage() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [lineItems, setLineItems] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0 }
  ]);
  
  const user = AuthService.getCurrentUser();
  if (!user) return null;

  const canCreate = () => {
    return ['admin', 'office_manager', 'sales'].includes(user.role);
  };

  if (!canCreate()) {
    return (
      <ProtectedLayout requiredModule="quotes">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600 mt-2">You don't have permission to create quotes.</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const updateLineItem = (id: number, field: string, value: any) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * 0.0875;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating quote:', { selectedCustomer, projectName, lineItems, total });
    router.push('/quotes');
  };

  return (
    <ProtectedLayout requiredModule="quotes">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Quote</h1>
            <p className="text-gray-600">Build a detailed quote for your customer</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/quotes">Cancel</Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer & Project Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Customer
                      </label>
                      <select
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      >
                        <option value="">Choose a customer...</option>
                        {mockCustomers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} ({customer.type})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name
                      </label>
                      <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. HVAC System Installation"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Describe the scope of work..."
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Line Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lineItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <Input
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                            placeholder="Description"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value))}
                            min="1"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </div>
                        <div className="col-span-1">
                          {lineItems.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeLineItem(item.id)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={addLineItem} variant="outline">
                      Add Line Item
                    </Button>
                  </div>

                  {lineItems.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                      <div className="flex justify-end">
                        <div className="w-64 space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
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
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{lineItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Create Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </ProtectedLayout>
  );
} 