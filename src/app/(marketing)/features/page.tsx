'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const coreFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "AI-Powered Smart Job Dispatch",
    description: "Our AI engine automatically assigns emergency calls and routine maintenance to the right technician based on skills, location, availability, and historical performance data.",
    benefits: [
      "Reduce response times by 50% with AI-driven intelligent routing",
      "Machine learning balances workloads and prevents technician burnout", 
      "AI prioritizes emergency calls and optimizes daily schedules",
      "Predictive analytics forecast technician performance and capacity"
    ],
    tradeExamples: [
      "Emergency plumbing calls routed to nearest available plumber",
      "HVAC maintenance scheduled based on technician specialization", 
      "Electrical emergencies prioritized over routine inspections"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "AI-Optimized GPS Tracking & Routing",
    description: "Track your crew's location in real-time while our AI continuously optimizes routes based on traffic, weather, job complexity, and historical data.",
    benefits: [
      "Real-time location tracking with AI-powered route adjustments",
      "Machine learning routing saves 2+ hours per technician daily",
      "AI predicts accurate arrival times accounting for job complexity",
      "ML analyzes historical routes to identify efficiency improvements"
    ],
    tradeExamples: [
      "Customers receive automatic texts when plumber is 15 minutes away",
      "HVAC routes optimized to minimize drive time between service calls",
      "Emergency locksmith dispatch shows nearest available technician"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "AI-Enhanced Estimates & Quotes",
    description: "Create detailed quotes with AI-optimized pricing based on market data, job complexity, and historical profitability. Send professional PDFs instantly via email or text.",
    benefits: [
      "Build estimates in under 5 minutes with AI pricing suggestions",
      "Machine learning optimizes pricing based on market conditions",
      "Professional PDF quotes with your branding and AI-generated insights",
      "AI predicts quote acceptance rates to optimize pricing strategy"
    ],
    tradeExamples: [
      "Plumbing estimates include pipe replacement costs and labor",
      "HVAC quotes show equipment options with financing terms",
      "Electrical estimates detail panel upgrade requirements"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: "Payment Processing & Invoicing",
    description: "Accept payments on-site with integrated card readers. Handle invoicing, payment tracking, and automatic follow-ups for overdue accounts.",
    benefits: [
      "Accept credit cards, checks, and cash in the field",
      "Automatic invoice generation and email delivery",
      "Payment reminders for overdue accounts",
      "Integration with QuickBooks and other accounting software"
    ],
    tradeExamples: [
      "HVAC customers pay immediately after service completion",
      "Plumbing emergency calls collected before technician leaves",
      "Auto repair shops process payments during service"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
    ),
    title: "AI-Powered Inventory Management",
    description: "Track parts, materials, and equipment across trucks and warehouses with AI-driven demand forecasting and predictive reordering based on seasonal patterns and job trends.",
    benefits: [
      "Real-time inventory tracking with AI-powered demand predictions",
      "Machine learning prevents stockouts by predicting seasonal demand",
      "AI optimizes inventory levels to reduce carrying costs",
      "Predictive analytics identify slow-moving stock for better cash flow"
    ],
    tradeExamples: [
      "Plumbing trucks stocked with most-used fittings and pipes",
      "HVAC technicians track refrigerant and filter inventory",
      "Electrical contractors manage wire and breaker stock levels"
    ]
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI-Driven Business Intelligence & Analytics",
    description: "Advanced machine learning algorithms analyze your business data to predict trends, identify opportunities, and provide actionable insights for growth and optimization.",
    benefits: [
      "AI predicts revenue trends and identifies growth opportunities",
      "Machine learning calculates customer lifetime value and churn risk",
      "Predictive analytics forecast seasonal demand and staffing needs",
      "AI-powered insights recommend pricing adjustments and service optimization"
    ],
    tradeExamples: [
      "Identify most profitable plumbing services and focus marketing",
      "Track HVAC maintenance contract renewal rates",
      "Analyze electrical job margins to optimize pricing"
    ]
  }
];

const additionalCapabilities = [
  {
    category: "Customer Management",
    features: [
      "Customer history and service records",
      "Automated follow-up campaigns",
      "Review and rating management",
      "Maintenance contract tracking"
    ]
  },
  {
    category: "Technician Tools", 
    features: [
      "Mobile app for field teams",
      "Digital work order completion",
      "Photo documentation and reports",
      "Time tracking and payroll integration"
    ]
  },
  {
    category: "Business Operations",
    features: [
      "Multi-location management",
      "Franchise and territory support",
      "Custom reporting and dashboards", 
      "API access for custom integrations"
    ]
  },
  {
    category: "Integrations",
    features: [
      "QuickBooks and Xero accounting",
      "Google Calendar and Outlook",
      "Mailchimp email marketing",
      "Square and Stripe payments"
    ]
  }
];

const tradeSpecificTools = [
  {
    trade: "Plumbing",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    tools: [
      "Pipe sizing calculators",
      "Water pressure diagnostics",
      "Drain cleaning tracking",
      "Permit management"
    ]
  },
  {
    trade: "HVAC", 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    tools: [
      "Energy audit tools",
      "Refrigerant tracking",
      "Maintenance scheduling",
      "Equipment warranties"
    ]
  },
  {
    trade: "Electrical",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tools: [
      "Load calculation tools",
      "Code compliance checking",
      "Panel labeling system",
      "Safety inspection forms"
    ]
  },
  {
    trade: "Automotive",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    tools: [
      "VIN lookup and history",
      "Parts compatibility checker",
      "Service interval tracking",
      "Fleet management tools"
    ]
  },
  {
    trade: "Appliance Repair",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    tools: [
      "Model number lookup",
      "Warranty status checking",
      "Parts availability search",
      "Service manual access"
    ]
  },
  {
    trade: "Locksmith",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4M6 11h12l-1 7H7l-1-7z" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    tools: [
      "Key cutting specifications",
      "Lock compatibility guide",
      "Security system integration",
      "Emergency response tools"
    ]
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="info" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
                <motion.svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </motion.svg>
                AI-Powered Features
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Everything You Need to <span className="text-blue-600 relative">
                Scale Your Trade Business
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 mb-8"
            >
              From AI-powered dispatching to predictive analytics, every feature is designed with 
              input from working trade professionals to solve real field service challenges.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-shadow">
                  Start Free 30-Day Trial
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50">
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Core AI-Powered Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced machine learning and intelligent automation tools designed specifically 
              for trade professionals by people who understand your industry.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-24"
          >
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  <motion.div
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <motion.div 
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {feature.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          variants={fadeInUp}
                          className="flex items-start space-x-3"
                        >
                          <motion.svg
                            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            whileHover={{ scale: 1.2 }}
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                          <span className="text-slate-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        Real Trade Examples
                      </Badge>
                      <div className="mt-3 space-y-2">
                        {feature.tradeExamples.map((example, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.4 }}
                            className="text-sm text-blue-600 font-medium"
                          >
                            • {example}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-8 shadow-2xl"
                      whileHover={{ 
                        scale: 1.02,
                        rotate: index % 2 === 0 ? 1 : -1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white/80 text-sm">Feature Demo</span>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-3 h-3 bg-green-400 rounded-full"
                          />
                        </div>
                        <h4 className="text-white font-semibold mb-2">
                          {feature.title.replace('AI-', '').replace('AI-Enhanced', '')}
                        </h4>
                        <div className="space-y-2">
                          {feature.benefits.slice(0, 2).map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.2 }}
                              className="text-white/70 text-sm"
                            >
                              ✓ {benefit.split('.')[0]}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div 
                          className="bg-white/10 backdrop-blur rounded-lg p-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl font-bold text-white">
                            {index === 0 ? '47' : index === 1 ? '15min' : index === 2 ? '$1.2K' : '98%'}
                          </div>
                          <div className="text-white/70 text-sm">
                            {index === 0 ? 'Active Jobs' : index === 1 ? 'Avg ETA' : index === 2 ? 'Avg Quote' : 'Success Rate'}
                          </div>
                        </motion.div>
                        <motion.div 
                          className="bg-white/10 backdrop-blur rounded-lg p-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl font-bold text-white">
                            {index === 0 ? '8/12' : index === 1 ? '12.3mi' : index === 2 ? '3.2K' : '+32%'}
                          </div>
                          <div className="text-white/70 text-sm">
                            {index === 0 ? 'Available' : index === 1 ? 'Route Opt' : index === 2 ? 'Monthly' : 'Revenue'}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Floating icons */}
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Capabilities */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Complete Business Management Suite
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Beyond our core AI features, ServiceVista includes everything you need to 
              run and grow your trade business efficiently.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {additionalCapabilities.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 group-hover:border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {category.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          variants={fadeInUp}
                          className="flex items-start space-x-3"
                        >
                          <motion.div
                            className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-slate-600 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trade-Specific Tools */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Specialized Tools for Every Trade
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry-specific features and calculators designed by trade professionals 
              who understand the unique needs of each specialty.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tradeSpecificTools.map((trade, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 group-hover:border-blue-200">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {trade.icon}
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {trade.trade}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {trade.tools.map((tool, i) => (
                        <motion.div
                          key={i}
                          variants={fadeInUp}
                          className="flex items-start space-x-3"
                        >
                          <motion.svg
                            className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            whileHover={{ scale: 1.2 }}
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                          <span className="text-slate-600 text-sm">{tool}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-sky-800 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-white leading-tight"
            >
              Ready to Experience These Features?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 leading-relaxed"
            >
              Start your free 30-day trial and see how ServiceVista AI's powerful features 
              can transform your trade business operations.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:from-sky-500 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 border-0">
                  Start Free 30-Day Trial
                  <motion.svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-sky-300/50 bg-white/10 backdrop-blur text-white hover:bg-white/20 hover:border-sky-200 text-lg px-8 py-4">
                  Schedule Live Demo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 