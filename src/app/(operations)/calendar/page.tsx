'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { AuthService } from '@/lib/auth/auth';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// Mock employees data
const mockEmployees = [
  { id: '1', name: 'John Admin', role: 'admin', color: '#ef4444' },
  { id: '2', name: 'Sarah Manager', role: 'office_manager', color: '#3b82f6' },
  { id: '3', name: 'Mike Dispatcher', role: 'dispatcher', color: '#10b981' },
  { id: '4', name: 'Lisa CSR', role: 'csr', color: '#f59e0b' },
  { id: '5', name: 'Bob Technician', role: 'technician', color: '#8b5cf6' },
  { id: '6', name: 'Mary Accountant', role: 'accountant', color: '#6366f1' },
  { id: '7', name: 'Tom Sales', role: 'sales', color: '#ec4899' }
];

// Mock tasks data - June 22-28, 2025 timeframe
const mockTasks = [
  // Week of June 22-28, 2025 (Current Week)
  {
    id: '1',
    title: 'AC Repair - Johnson Residence',
    employeeId: '5',
    date: '2025-06-22',
    time: '09:00',
    duration: 120,
    type: 'service_call',
    status: 'completed',
    priority: 'high',
    customer: 'Johnson Family',
    location: '123 Main St'
  },
  {
    id: '2',
    title: 'HVAC Installation Quote',
    employeeId: '7',
    date: '2025-06-22',
    time: '14:00',
    duration: 90,
    type: 'quote',
    status: 'completed',
    priority: 'medium',
    customer: 'Smith Corp',
    location: '456 Business Ave'
  },
  {
    id: '3',
    title: 'Weekly Staff Meeting',
    employeeId: '2',
    date: '2025-06-23',
    time: '10:00',
    duration: 60,
    type: 'meeting',
    status: 'completed',
    priority: 'medium',
    customer: 'Internal',
    location: 'Conference Room A'
  },
  {
    id: '4',
    title: 'Customer Follow-up Calls',
    employeeId: '4',
    date: '2025-06-23',
    time: '13:00',
    duration: 180,
    type: 'admin',
    status: 'completed',
    priority: 'medium',
    customer: 'Multiple',
    location: 'Office'
  },
  {
    id: '5',
    title: 'Pool Pump Maintenance',
    employeeId: '5',
    date: '2025-06-23',
    time: '08:30',
    duration: 90,
    type: 'maintenance',
    status: 'completed',
    priority: 'medium',
    customer: 'Davis Family',
    location: '789 Oak Street'
  },
  {
    id: '6',
    title: 'Monthly Financial Review',
    employeeId: '6',
    date: '2025-06-24',
    time: '11:00',
    duration: 120,
    type: 'admin',
    status: 'completed',
    priority: 'high',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '7',
    title: 'Central AC Installation - Martinez Home',
    employeeId: '5',
    date: '2025-06-24',
    time: '10:00',
    duration: 300,
    type: 'service_call',
    status: 'completed',
    priority: 'high',
    customer: 'Martinez Family',
    location: '321 Oak Ave'
  },
  {
    id: '8',
    title: 'Commercial Cooling System Inspection',
    employeeId: '5',
    date: '2025-06-25',
    time: '09:00',
    duration: 180,
    type: 'maintenance',
    status: 'completed',
    priority: 'medium',
    customer: 'Brown Corp',
    location: '654 Industrial Way'
  },
  {
    id: '9',
    title: 'Summer HVAC Efficiency Consultation',
    employeeId: '7',
    date: '2025-06-25',
    time: '14:00',
    duration: 120,
    type: 'quote',
    status: 'completed',
    priority: 'medium',
    customer: 'Wilson Family',
    location: '555 Elm Street'
  },
  {
    id: '10',
    title: 'Emergency AC Repair',
    employeeId: '5',
    date: '2025-06-26',
    time: '15:30',
    duration: 120,
    type: 'service_call',
    status: 'completed',
    priority: 'high',
    customer: 'Emergency Call - Thompson',
    location: '888 Crisis Lane'
  },
  {
    id: '11',
    title: 'Team Summer Safety Training',
    employeeId: '2',
    date: '2025-06-26',
    time: '10:00',
    duration: 90,
    type: 'meeting',
    status: 'completed',
    priority: 'high',
    customer: 'Internal',
    location: 'Training Room'
  },
  {
    id: '12',
    title: 'Ductwork Cleaning - Office Building',
    employeeId: '5',
    date: '2025-06-27',
    time: '07:30',
    duration: 240,
    type: 'maintenance',
    status: 'completed',
    priority: 'medium',
    customer: 'Metro Office Complex',
    location: '999 Business Park Dr'
  },
  {
    id: '13',
    title: 'Client Invoicing & Billing',
    employeeId: '6',
    date: '2025-06-27',
    time: '09:00',
    duration: 180,
    type: 'admin',
    status: 'completed',
    priority: 'high',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '14',
    title: 'Vacation Planning Meeting',
    employeeId: '2',
    date: '2025-06-28',
    time: '12:00',
    duration: 60,
    type: 'meeting',
    status: 'scheduled',
    priority: 'low',
    customer: 'Internal',
    location: 'Conference Room B'
  },
  {
    id: '15',
    title: 'Residential Cooling Quote',
    employeeId: '7',
    date: '2025-06-28',
    time: '10:00',
    duration: 90,
    type: 'quote',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Sunset Homes',
    location: '777 Construction Ave'
  },
  
  // Next Week - June 29 - July 5, 2025
  {
    id: '16',
    title: 'Pool Equipment Service',
    employeeId: '5',
    date: '2025-06-30',
    time: '09:00',
    duration: 150,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Multiple Residences',
    location: 'Various Pool Locations'
  },
  {
    id: '17',
    title: 'Commercial AC System Quote',
    employeeId: '7',
    date: '2025-06-30',
    time: '13:00',
    duration: 120,
    type: 'quote',
    status: 'scheduled',
    priority: 'high',
    customer: 'Green Valley School',
    location: '444 Education Blvd'
  },
  {
    id: '18',
    title: 'Summer Maintenance - Apartment Complex',
    employeeId: '5',
    date: '2025-07-01',
    time: '08:00',
    duration: 360,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Riverside Apartments',
    location: '123 River View Dr'
  },
  {
    id: '19',
    title: 'Mid-Year Financial Report',
    employeeId: '6',
    date: '2025-07-01',
    time: '10:00',
    duration: 180,
    type: 'admin',
    status: 'scheduled',
    priority: 'high',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '20',
    title: 'Heat Pump Installation',
    employeeId: '5',
    date: '2025-07-02',
    time: '09:30',
    duration: 240,
    type: 'service_call',
    status: 'scheduled',
    priority: 'high',
    customer: 'Thompson Residence',
    location: '666 Heating Way'
  },
  {
    id: '21',
    title: 'Solar AC System Consultation',
    employeeId: '7',
    date: '2025-07-02',
    time: '14:00',
    duration: 120,
    type: 'quote',
    status: 'scheduled',
    priority: 'high',
    customer: 'Anderson Family',
    location: '111 Electric Ave'
  },
  {
    id: '22',
    title: 'Weekly Team Meeting',
    employeeId: '2',
    date: '2025-07-03',
    time: '16:00',
    duration: 60,
    type: 'meeting',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Conference Room B'
  },
  {
    id: '23',
    title: 'Indoor Air Quality Assessment',
    employeeId: '5',
    date: '2025-07-03',
    time: '10:00',
    duration: 120,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'medium',
    customer: 'HealthFirst Clinic',
    location: '222 Wellness Blvd'
  },
  {
    id: '24',
    title: 'Restaurant Freezer Repair',
    employeeId: '5',
    date: '2025-07-04',
    time: '11:00',
    duration: 180,
    type: 'service_call',
    status: 'scheduled',
    priority: 'high',
    customer: 'Bella Vista Restaurant',
    location: '555 Food Court'
  },
  {
    id: '25',
    title: 'Holiday Schedule Planning',
    employeeId: '6',
    date: '2025-07-04',
    time: '09:00',
    duration: 90,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Office'
  },
  
  // Week of July 6-12, 2025
  {
    id: '26',
    title: 'Emergency Generator Maintenance',
    employeeId: '5',
    date: '2025-07-07',
    time: '09:00',
    duration: 180,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'high',
    customer: 'Hospital Emergency Dept',
    location: '111 Medical Center'
  },
  {
    id: '27',
    title: 'Customer Satisfaction Survey Calls',
    employeeId: '4',
    date: '2025-07-07',
    time: '13:00',
    duration: 150,
    type: 'admin',
    status: 'scheduled',
    priority: 'low',
    customer: 'Multiple',
    location: 'Office'
  },
  {
    id: '28',
    title: 'Chiller System Maintenance',
    employeeId: '5',
    date: '2025-07-08',
    time: '08:30',
    duration: 240,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'high',
    customer: 'City Community Center',
    location: '888 Community Ave'
  },
  {
    id: '29',
    title: 'New Client Onboarding - Summer Contracts',
    employeeId: '4',
    date: '2025-07-08',
    time: '10:00',
    duration: 90,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Premium Properties',
    location: 'Office'
  },
  {
    id: '30',
    title: 'Quarterly Safety & Equipment Review',
    employeeId: '2',
    date: '2025-07-09',
    time: '15:00',
    duration: 120,
    type: 'meeting',
    status: 'scheduled',
    priority: 'high',
    customer: 'Internal',
    location: 'Main Conference Room'
  },
  {
    id: '31',
    title: 'Drain Line Cleaning - Commercial',
    employeeId: '5',
    date: '2025-07-10',
    time: '09:00',
    duration: 120,
    type: 'service_call',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Retail Plaza Management',
    location: '333 Shopping Center'
  },
  {
    id: '32',
    title: 'Summer Equipment Inventory',
    employeeId: '5',
    date: '2025-07-10',
    time: '14:00',
    duration: 120,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Service Garage'
  },
  {
    id: '33',
    title: 'Budget Review - Summer Operations',
    employeeId: '6',
    date: '2025-07-11',
    time: '09:00',
    duration: 180,
    type: 'admin',
    status: 'scheduled',
    priority: 'high',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '34',
    title: 'Residential AC Upgrade',
    employeeId: '5',
    date: '2025-07-11',
    time: '08:00',
    duration: 300,
    type: 'service_call',
    status: 'scheduled',
    priority: 'high',
    customer: 'Garcia Residence',
    location: '777 Pipe Street'
  },
  {
    id: '35',
    title: 'Commercial Cooling Quote - Office Complex',
    employeeId: '7',
    date: '2025-07-12',
    time: '10:00',
    duration: 150,
    type: 'quote',
    status: 'scheduled',
    priority: 'high',
    customer: 'Elite Property Management',
    location: '666 Property Lane'
  },
  {
    id: '36',
    title: 'Summer Service Calls Coordination',
    employeeId: '4',
    date: '2025-07-12',
    time: '13:00',
    duration: 120,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Multiple',
    location: 'Office'
  },
  
  // Week of July 13-19, 2025
  {
    id: '37',
    title: 'Data Center Cooling System Service',
    employeeId: '5',
    date: '2025-07-14',
    time: '08:00',
    duration: 360,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'high',
    customer: 'Tech Start-up Office',
    location: '777 Innovation Dr'
  },
  {
    id: '38',
    title: 'Summer Vendor Meeting - Equipment',
    employeeId: '2',
    date: '2025-07-14',
    time: '14:00',
    duration: 90,
    type: 'meeting',
    status: 'scheduled',
    priority: 'medium',
    customer: 'HVAC Supplies Co',
    location: 'Office'
  },
  {
    id: '39',
    title: 'Peak Season Maintenance Round',
    employeeId: '5',
    date: '2025-07-15',
    time: '08:00',
    duration: 480,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'high',
    customer: 'Multiple Commercial',
    location: 'Various Locations'
  },
  {
    id: '40',
    title: 'Client Relationship Summer Review',
    employeeId: '4',
    date: '2025-07-15',
    time: '10:00',
    duration: 120,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '41',
    title: 'Pool House AC Installation',
    employeeId: '5',
    date: '2025-07-16',
    time: '09:00',
    duration: 240,
    type: 'service_call',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Miller Family',
    location: '999 Drain Lane'
  },
  {
    id: '42',
    title: 'Mid-Summer Sales Review',
    employeeId: '7',
    date: '2025-07-16',
    time: '15:00',
    duration: 90,
    type: 'meeting',
    status: 'scheduled',
    priority: 'high',
    customer: 'Internal',
    location: 'Conference Room A'
  },
  {
    id: '43',
    title: 'Summer Payroll & Overtime Review',
    employeeId: '6',
    date: '2025-07-17',
    time: '09:00',
    duration: 180,
    type: 'admin',
    status: 'scheduled',
    priority: 'high',
    customer: 'Internal',
    location: 'Office'
  },
  {
    id: '44',
    title: 'Outdoor Kitchen Cooling Consultation',
    employeeId: '7',
    date: '2025-07-17',
    time: '11:00',
    duration: 90,
    type: 'quote',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Rodriguez Family',
    location: '222 Renovation Rd'
  },
  {
    id: '45',
    title: 'Hotel HVAC System Upgrade',
    employeeId: '5',
    date: '2025-07-18',
    time: '08:00',
    duration: 360,
    type: 'service_call',
    status: 'scheduled',
    priority: 'high',
    customer: 'Old Town Hotel',
    location: '333 Heritage St'
  },
  {
    id: '46',
    title: 'Summer Training: New AC Technologies',
    employeeId: '2',
    date: '2025-07-18',
    time: '13:00',
    duration: 120,
    type: 'meeting',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Training Room'
  },
  {
    id: '47',
    title: 'Industrial Cooling Equipment Inspection',
    employeeId: '5',
    date: '2025-07-19',
    time: '09:00',
    duration: 240,
    type: 'maintenance',
    status: 'scheduled',
    priority: 'high',
    customer: 'Manufacturing Plant',
    location: '444 Industrial Blvd'
  },
  {
    id: '48',
    title: 'Customer Feedback Summer Analysis',
    employeeId: '4',
    date: '2025-07-19',
    time: '14:00',
    duration: 120,
    type: 'admin',
    status: 'scheduled',
    priority: 'medium',
    customer: 'Internal',
    location: 'Office'
  }
];

export default function CalendarPage() {
  const [viewType, setViewType] = useState('dayGridMonth');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedTaskType, setSelectedTaskType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const user = AuthService.getCurrentUser();
  if (!user) {
    return (
      <ProtectedLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the calendar.</p>
        </div>
      </ProtectedLayout>
    );
  }

  const filteredTasks = useMemo(() => {
    return mockTasks.filter(task => {
      const matchesEmployee = selectedEmployee === 'all' || task.employeeId === selectedEmployee;
      const matchesType = selectedTaskType === 'all' || task.type === selectedTaskType;
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.customer.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesEmployee && matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedEmployee, selectedTaskType, selectedStatus, searchTerm]);

  // Transform tasks to FullCalendar events
  const calendarEvents = useMemo(() => {
    return filteredTasks.map(task => {
      const employee = mockEmployees.find(e => e.id === task.employeeId);
      const startTime = new Date(`${task.date}T${task.time}:00`);
      const endTime = new Date(startTime.getTime() + task.duration * 60000);

      return {
        id: task.id,
        title: task.title,
        start: startTime,
        end: endTime,
        backgroundColor: employee?.color || '#6b7280',
        borderColor: employee?.color || '#6b7280',
        textColor: '#ffffff',
        extendedProps: {
          employee: employee?.name,
          customer: task.customer,
          location: task.location,
          type: task.type,
          status: task.status,
          priority: task.priority,
          duration: task.duration
        }
      };
    });
  }, [filteredTasks]);

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'service_call': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'quote': return 'bg-green-100 text-green-800 border-green-200';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedEmployee('all');
    setSelectedTaskType('all');
    setSelectedStatus('all');
  };

  // Helper function to format text for display
  const formatDisplayText = (text: string): string => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleEventClick = (clickInfo: any) => {
    const { event } = clickInfo;
    const props = event.extendedProps;
    
    alert(`
Event: ${event.title}
Employee: ${props.employee}
Customer: ${props.customer}
Location: ${props.location}
Type: ${props.type}
Status: ${props.status}
Priority: ${props.priority}
Duration: ${props.duration} minutes
    `);
  };

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return filteredTasks.filter(task => task.date === today);
  };

  return (
    <ProtectedLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Calendar</h1>
            <p className="text-gray-600 mt-2">View and manage employee schedules and tasks</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today
            </Button>
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="px-8 py-10">
              <div className="flex items-center justify-between mb-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mt-2">Total Tasks</p>
                  <p className="text-2xl font-bold text-blue-600 mt-3">{filteredTasks.length}</p>
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Active Employees</p>
                  <p className="text-2xl font-bold text-green-600 mt-3">{mockEmployees.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-sm font-medium text-gray-600 mt-2">Today's Tasks</p>
                  <p className="text-2xl font-bold text-purple-600 mt-3">{getTodaysTasks().length}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p className="text-sm font-medium text-gray-600 mt-2">High Priority</p>
                  <p className="text-2xl font-bold text-red-600 mt-3">
                    {filteredTasks.filter(task => task.priority === 'high').length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Controls and Filters */}
        <Card className="mb-6 hover:shadow-lg transition-shadow">
          <CardContent className="px-8 py-6">
            <div className="mb-6 mt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Calendar Controls & Filters
                </h3>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  Showing {filteredTasks.length} of {mockTasks.length} tasks
                </div>
              </div>
              
              {/* View Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Calendar View</label>
                <div className="flex space-x-2">
                  <Button
                    variant={viewType === 'dayGridMonth' ? 'default' : 'outline'}
                    onClick={() => setViewType('dayGridMonth')}
                  >
                    Month
                  </Button>
                  <Button
                    variant={viewType === 'timeGridWeek' ? 'default' : 'outline'}
                    onClick={() => setViewType('timeGridWeek')}
                  >
                    Week
                  </Button>
                  <Button
                    variant={viewType === 'timeGridDay' ? 'default' : 'outline'}
                    onClick={() => setViewType('timeGridDay')}
                  >
                    Day
                  </Button>
                  <Button
                    variant={viewType === 'listWeek' ? 'default' : 'outline'}
                    onClick={() => setViewType('listWeek')}
                  >
                    List
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Search Tasks</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Input
                      placeholder="Search tasks or customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Employee</label>
                  <Select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="all">All Employees</option>
                    {mockEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Task Type</label>
                  <Select
                    value={selectedTaskType}
                    onChange={(e) => setSelectedTaskType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="service_call">Service Call</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="quote">Quote</option>
                    <option value="meeting">Meeting</option>
                    <option value="admin">Admin</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
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
                {selectedEmployee !== 'all' && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Employee: {mockEmployees.find(e => e.id === selectedEmployee)?.name}
                  </Badge>
                )}
                {selectedTaskType !== 'all' && (
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Type: {formatDisplayText(selectedTaskType)}
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

        {/* FullCalendar Component */}
        <Card className="mb-6 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Employee Task Calendar</span>
            </CardTitle>
            <CardDescription>
              Click on any event to view details. Use the view buttons above to switch between different calendar views.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="calendar-container" style={{ minHeight: '600px' }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={viewType}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                events={calendarEvents}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventClick={handleEventClick}
                height="auto"
                eventDisplay="block"
                displayEventTime={true}
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  omitZeroMinute: false,
                  meridiem: 'short'
                }}
                slotMinTime="06:00:00"
                slotMaxTime="20:00:00"
                allDaySlot={false}
                nowIndicator={true}
                weekends={true}
                businessHours={{
                  daysOfWeek: [1, 2, 3, 4, 5],
                  startTime: '08:00',
                  endTime: '18:00'
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Employee Legend */}
        <Card className="mb-6 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Employee Legend</CardTitle>
            <CardDescription>Color coding for employee assignments</CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {mockEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: employee.color }}
                  ></div>
                  <span className="text-sm font-medium">{employee.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {employee.role.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks List */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Detailed view of scheduled tasks with filtering applied
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <div className="space-y-4 mt-4">
              {filteredTasks.slice(0, 10).map((task) => {
                const employee = mockEmployees.find(e => e.id === task.employeeId);
                return (
                  <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <Badge className={getTaskTypeColor(task.type)}>
                          {task.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Employee:</span>
                        <div className="mt-1 flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: employee?.color }}
                          ></div>
                          <span>{employee?.name}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>
                        <div className="mt-1">{task.date} {task.time} ({task.duration}min)</div>
                      </div>
                      <div>
                        <span className="font-medium">Customer:</span>
                        <div className="mt-1">{task.customer}</div>
                      </div>
                      <div>
                        <span className="font-medium">Location:</span>
                        <div className="mt-1">{task.location}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
} 