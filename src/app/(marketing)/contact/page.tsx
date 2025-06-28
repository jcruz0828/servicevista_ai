import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Phone Support",
    description: "Talk directly to our trade specialists",
    contact: "1-800-TRADES (1-800-872-3371)",
    availability: "Monday-Friday: 6 AM - 8 PM CT\nSaturday: 8 AM - 5 PM CT",
    best: "Best for: Urgent issues, complex questions"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Support",
    description: "Detailed help with screenshots and documentation",
    contact: "support@servicevista.ai",
    availability: "Response within 2 hours during business hours\n24-hour response guarantee",
    best: "Best for: Feature requests, billing questions"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Live Chat",
    description: "Instant help during business hours",
    contact: "Click the chat icon in the bottom right",
    availability: "Monday-Friday: 7 AM - 7 PM CT\nWeekends: Emergency support only",
    best: "Best for: Quick questions, setup help"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Video Demo",
    description: "Personalized walkthrough for your trade",
    contact: "Schedule at calendly.com/servicevista-demo",
    availability: "Available 7 days a week\nEvening and weekend slots available",
    best: "Best for: Seeing features in action, trial setup"
  }
];

const tradeSpecialists = [
  {
    name: "Carlos Rivera",
    title: "Plumbing Specialist",
    background: "15 years plumbing contractor",
    expertise: ["Emergency dispatch", "Route optimization", "Pipe inventory management"],
    contact: "carlos@servicevista.ai",
    image: "CR"
  },
  {
    name: "Jennifer Park",
    title: "HVAC Specialist", 
    background: "Former HVAC business owner",
    expertise: ["Maintenance contracts", "Seasonal scheduling", "Energy audits"],
    contact: "jennifer@servicevista.ai",
    image: "JP"
  },
  {
    name: "Marcus Thompson",
    title: "Electrical Specialist",
    background: "20 years electrical contracting",
    expertise: ["Code compliance", "Project management", "Safety inspections"],
    contact: "marcus@servicevista.ai",
    image: "MT"
  },
  {
    name: "Sarah Kim",
    title: "Automotive Specialist",
    background: "Fleet management expert",
    expertise: ["Mobile mechanics", "Fleet tracking", "Service intervals"],
    contact: "sarah@servicevista.ai",
    image: "SK"
  }
];

const officeLocations = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 400\nSan Francisco, CA 94105",
    phone: "(415) 555-0123",
    timezone: "Pacific Time",
    focus: "Product Development & Engineering"
  },
  {
    city: "Austin",
    address: "456 South Lamar Blvd, Suite 200\nAustin, TX 78704", 
    phone: "(512) 555-0456",
    timezone: "Central Time",
    focus: "Customer Success & Trade Support"
  },
  {
    city: "Atlanta",
    address: "789 Peachtree Street, Suite 300\nAtlanta, GA 30309",
    phone: "(404) 555-0789",
    timezone: "Eastern Time", 
    focus: "Sales & Business Development"
  }
];

const faqs = [
  {
    question: "How quickly can I get help if I'm having an issue?",
    answer: "For urgent issues during business hours, call our phone support line for immediate help. Our trade specialists understand the urgency of field service issues and prioritize support accordingly."
  },
  {
    question: "Do you provide setup assistance for new customers?",
    answer: "Yes! Every new customer gets free setup assistance from one of our trade specialists. We'll help migrate your data, train your team, and ensure you're fully operational before your trial ends."
  },
  {
    question: "Can I speak to someone who understands my specific trade?",
    answer: "Absolutely. Our support team includes specialists with real-world experience in plumbing, HVAC, electrical, and automotive repair. You'll talk to someone who understands your business."
  },
  {
    question: "What if I need help outside of business hours?",
    answer: "While our full support team works business hours, we offer emergency support for critical system issues. Use the live chat or call our emergency line for assistance."
  },
  {
    question: "Is training included with my subscription?",
    answer: "Yes, we provide comprehensive training for your entire team as part of your subscription. This includes initial setup training, ongoing education webinars, and access to our trade-specific training materials."
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="info" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Here to help your trade business succeed
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Get Help From <span className="text-blue-600">Trade Specialists</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Our support team includes experienced trade professionals who understand your business. 
            Whether you're just getting started or need help optimizing your operations, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-shadow">
              Start Free 30-Day Trial
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50">
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Multiple Ways to Get Help
            </h2>
            <p className="text-xl text-slate-600">
              Choose the method that works best for your situation and schedule
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-blue-200 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {method.icon}
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-base">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Contact:</h4>
                      <p className="text-blue-600 font-medium">{method.contact}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Availability:</h4>
                      <p className="text-sm text-slate-600 whitespace-pre-line">{method.availability}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium">{method.best}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Specialists */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Trade Specialists
            </h2>
            <p className="text-xl text-slate-600">
              Support team members with real-world experience in your industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tradeSpecialists.map((specialist, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-blue-200 group">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="text-xl font-bold">{specialist.image}</span>
                  </div>
                  <CardTitle className="text-xl">{specialist.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{specialist.title}</p>
                  <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-700">
                    {specialist.background}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Expertise:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {specialist.expertise.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-slate-300 hover:bg-slate-50">
                      Contact {specialist.name.split(' ')[0]}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-slate-600">
              ServiceVista AI offices across North America
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-blue-200 group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-center group-hover:text-blue-600 transition-colors">
                    {office.city}
                  </CardTitle>
                  <p className="text-center text-blue-600 font-medium">{office.focus}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Address:
                      </h4>
                      <p className="text-slate-600 whitespace-pre-line ml-6">{office.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone:
                      </h4>
                      <p className="text-blue-600 font-medium ml-6">{office.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Timezone:
                      </h4>
                      <p className="text-slate-600 ml-6">{office.timezone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Get in touch with our team
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Let's Discuss Your <span className="text-blue-600">Trade Business</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tell us about your current challenges and goals. Our trade specialists will provide 
              personalized recommendations to help your business grow and operate more efficiently.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="shadow-lg border-slate-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Quick Response Guarantee</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Under 2 Hours</p>
                      <p className="text-sm text-slate-600">Response during business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Trade Specialist</p>
                      <p className="text-sm text-slate-600">Matched to your industry</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Free Demo Available</p>
                      <p className="text-sm text-slate-600">Personalized walkthrough</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-slate-200 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Sales & Demo</p>
                    <p className="text-blue-600 font-medium">1-800-TRADES (872-3371)</p>
                    <p className="text-sm text-slate-600">Monday-Friday 6 AM - 8 PM CT</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Email</p>
                    <p className="text-blue-600 font-medium">hello@servicevista.ai</p>
                    <p className="text-sm text-slate-600">For detailed inquiries</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-slate-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 border-b border-slate-200">
                  <CardTitle className="text-2xl text-slate-900">Tell Us About Your Business</CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    Complete this form and we'll have a trade specialist contact you within 2 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <form className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            First Name *
                          </label>
                                                      <Input 
                              type="text" 
                              required 
                              placeholder="Enter your first name"
                            />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Last Name *
                          </label>
                                                      <Input 
                              type="text" 
                              required 
                              placeholder="Enter your last name"
                            />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Work Email *
                          </label>
                                                      <Input 
                              type="email" 
                              required 
                              placeholder="your@company.com"
                            />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Phone Number *
                          </label>
                                                      <Input 
                              type="tel" 
                              required
                              placeholder="(555) 123-4567"
                            />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Business Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Company Name *
                          </label>
                                                      <Input 
                              type="text" 
                              required 
                              placeholder="Your Trade Business Name"
                            />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Your Role *
                          </label>
                                                     <Select required>
                             <option value="">Select your role</option>
                             <option value="owner">Business Owner</option>
                             <option value="manager">Operations Manager</option>
                             <option value="office-manager">Office Manager</option>
                             <option value="dispatcher">Dispatcher</option>
                             <option value="other">Other</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Primary Trade *
                          </label>
                                                     <Select required>
                             <option value="">Select your primary trade</option>
                             <option value="plumbing">Plumbing</option>
                             <option value="hvac">HVAC</option>
                             <option value="electrical">Electrical</option>
                             <option value="automotive">Automotive Repair</option>
                             <option value="appliance">Appliance Repair</option>
                             <option value="locksmith">Locksmith</option>
                             <option value="multiple">Multiple Trades</option>
                             <option value="other">Other</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Number of Technicians *
                          </label>
                                                     <Select required>
                             <option value="">Select team size</option>
                             <option value="1-2">Just me (1-2 people)</option>
                             <option value="3-5">Small team (3-5 technicians)</option>
                             <option value="6-15">Growing business (6-15 technicians)</option>
                             <option value="16-50">Established company (16-50 technicians)</option>
                             <option value="50+">Large operation (50+ technicians)</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Annual Revenue
                          </label>
                                                     <Select>
                             <option value="">Select range (optional)</option>
                             <option value="under-250k">Under $250K</option>
                             <option value="250k-500k">$250K - $500K</option>
                             <option value="500k-1m">$500K - $1M</option>
                             <option value="1m-2m">$1M - $2M</option>
                             <option value="2m-5m">$2M - $5M</option>
                             <option value="5m+">$5M+</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Current Software
                          </label>
                                                     <Select>
                             <option value="">What do you use now?</option>
                             <option value="servicetitan">ServiceTitan</option>
                             <option value="housecall">Housecall Pro</option>
                             <option value="jobber">Jobber</option>
                             <option value="workiz">Workiz</option>
                             <option value="fieldedge">FieldEdge</option>
                             <option value="paper">Paper/spreadsheets</option>
                             <option value="other">Other software</option>
                             <option value="none">No current system</option>
                           </Select>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tell Us About Your Needs
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            What's your biggest challenge right now? *
                          </label>
                                                     <Select required>
                             <option value="">Select your primary challenge</option>
                             <option value="scheduling">Scheduling and dispatching</option>
                             <option value="customer-communication">Customer communication</option>
                             <option value="invoicing-payments">Invoicing and payments</option>
                             <option value="inventory">Inventory management</option>
                             <option value="reporting">Business reporting and analytics</option>
                             <option value="technician-efficiency">Technician efficiency</option>
                             <option value="growth-scaling">Scaling and growth</option>
                             <option value="cost-reduction">Reducing operational costs</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            When are you looking to implement a new solution? *
                          </label>
                                                     <Select required>
                             <option value="">Select timeline</option>
                             <option value="asap">As soon as possible</option>
                             <option value="1-month">Within 1 month</option>
                             <option value="1-3-months">1-3 months</option>
                             <option value="3-6-months">3-6 months</option>
                             <option value="just-researching">Just researching options</option>
                           </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Additional Details
                          </label>
                                                     <textarea 
                             rows={4} 
                             className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                             placeholder="Tell us more about your specific needs, current pain points, or any questions you have about ServiceVista AI..."
                           ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Communication Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Preferred Contact Method *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="contact-method" value="phone" className="text-blue-600 focus:ring-blue-500" required />
                              <span className="text-sm">Phone</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="contact-method" value="email" className="text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">Email</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="contact-method" value="text" className="text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">Text</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name="contact-method" value="video" className="text-blue-600 focus:ring-blue-500" />
                              <span className="text-sm">Video Call</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-900 mb-2">
                            Best Time to Contact
                          </label>
                                                     <Select>
                             <option value="">Select preferred time</option>
                             <option value="morning">Morning (8 AM - 12 PM)</option>
                             <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                             <option value="evening">Evening (5 PM - 8 PM)</option>
                             <option value="anytime">Anytime during business hours</option>
                           </Select>
                        </div>
                        <div className="flex items-start space-x-3">
                          <input 
                            type="checkbox" 
                            id="newsletter" 
                            className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="newsletter" className="text-sm text-slate-600">
                            I'd like to receive trade business tips, industry insights, and ServiceVista AI product updates via email. You can unsubscribe at any time.
                          </label>
                        </div>
                      </div>
                    </div>

                                         <div className="flex flex-col sm:flex-row gap-4">
                       <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                         </svg>
                         Send Message
                       </Button>
                       <Button size="lg" variant="outline" className="flex-1 border-slate-300 hover:bg-slate-50">
                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                         </svg>
                         Schedule Demo Instead
                       </Button>
                     </div>

                    <div className="text-center">
                      <p className="text-sm text-slate-500 mb-2">
                        <strong>Response Guarantee:</strong> We'll contact you within 2 hours during business hours (6 AM - 8 PM CT, Monday-Friday).
                      </p>
                      <p className="text-xs text-slate-400">
                        Your information is secure and will never be shared. Read our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Quick answers to common support and contact questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300 border-slate-200">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-50">
              View Complete FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Support CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            🚨 Need Urgent Help?
          </h2>
          <p className="text-xl mb-6 text-red-100">
            For critical system issues affecting your business operations
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-slate-100 shadow-lg">
            Call Emergency Support: 1-800-URGENT1
          </Button>
          <p className="text-red-200 text-sm mt-4">
            Available 24/7 for system outages and critical issues
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
} 