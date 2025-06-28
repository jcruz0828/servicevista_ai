'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "AI-Powered Smart Dispatch",
    description: "Our AI engine automatically assigns emergency calls and routine maintenance to the optimal technician based on skills, location, availability, and historical performance data.",
    color: "blue"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "AI-Optimized Route Tracking",
    description: "Track your crew's location in real-time while our AI continuously optimizes routes based on traffic, weather, job complexity, and historical data to minimize travel time.",
    color: "sky"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "AI-Enhanced Estimates",
    description: "Create detailed quotes with AI-optimized pricing based on market data, job complexity, and historical profitability. Machine learning suggests optimal pricing strategies.",
    color: "yellow"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: "Payment Processing",
    description: "Accept payments on-site with integrated card readers. Handle invoicing, payment tracking, and automatic follow-ups for overdue accounts.",
    color: "emerald"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
    ),
    title: "AI-Powered Inventory Management",
    description: "Track parts, materials, and equipment with AI-driven demand forecasting and predictive reordering based on seasonal patterns, job trends, and usage history.",
    color: "orange"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI-Driven Business Intelligence",
    description: "Advanced machine learning algorithms analyze your business data to predict trends, identify opportunities, and provide actionable insights for growth optimization.",
    color: "rose"
  }
];

const tradeTypes = [
  {
    name: "Plumbing",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    customers: "850+",
    description: "Emergency repairs, drain cleaning, pipe installation"
  },
  {
    name: "HVAC",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    customers: "1,200+",
    description: "AC repair, heating installation, maintenance contracts"
  },
  {
    name: "Electrical",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    customers: "720+",
    description: "Wiring, panel upgrades, commercial electrical work"
  },
  {
    name: "Automotive",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    customers: "400+",
    description: "Mobile mechanics, fleet maintenance, roadside service"
  },
  {
    name: "Appliance Repair",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    customers: "350+",
    description: "Home appliances, commercial equipment, warranty work"
  },
  {
    name: "Locksmith",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    customers: "280+",
    description: "Emergency lockouts, security systems, key cutting"
  }
];

const stats = [
  { label: "Active Trade Businesses", value: "3,800+" },
  { label: "Service Calls Completed", value: "2.1M+" },
  { label: "Average Revenue Increase", value: "32%" },
  { label: "Customer Satisfaction", value: "98.7%" }
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "AI-Powered Job Capacity Increase",
    description: "Handle 40% more service calls with AI-driven intelligent dispatching and machine learning route optimization.",
    benefit: "+40% more jobs"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "AI-Optimized Response Times",
    description: "Get technicians to emergency calls faster with AI-powered GPS tracking and predictive routing algorithms.",
    benefit: "50% faster response"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: "Machine Learning Revenue Optimization",
    description: "AI analyzes patterns to optimize scheduling, pricing, and resource allocation to maximize billable hours per technician.",
    benefit: "+32% revenue increase"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "AI-Driven Customer Satisfaction",
    description: "Machine learning predicts accurate arrival times and optimizes service delivery for consistently exceptional customer experiences.",
    benefit: "98.7% satisfaction rate"
  }
];

const testimonials = [
  {
    content: "Since switching to ServiceVista AI, we've increased our daily job capacity by 40%. The dispatch system is a game-changer for managing emergency plumbing calls.",
    author: "Mike Torres",
    role: "Owner",
    company: "Torres Plumbing Services",
    trade: "Plumbing",
    years: "15 years in business"
  },
  {
    content: "The GPS tracking and customer notifications have transformed our HVAC business. Customers love knowing exactly when we'll arrive, and our efficiency is through the roof.",
    author: "Jennifer Kim",
    role: "Operations Manager", 
    company: "Climate Pro HVAC",
    trade: "HVAC",
    years: "22 years in business"
  },
  {
    content: "As an electrical contractor, accurate quotes are everything. ServiceVista's estimating tools help us win more jobs and maintain healthy margins on every project.",
    author: "Robert Chen",
    role: "Master Electrician & Owner",
    company: "Chen Electric",
    trade: "Electrical",
    years: "18 years in business"
  }
];

const integrations = [
  { 
    name: "QuickBooks",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    name: "ServiceTitan",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  { 
    name: "Square",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  { 
    name: "Stripe",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    name: "Mailchimp",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    name: "Slack",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Counter animation hook
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startCountUp = () => {
    if (hasAnimated) return;
    setHasAnimated(true);
    
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);
  };

  return { count, startCountUp, hasAnimated };
}

// Animated counter component
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: string, suffix?: string, prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^\d]/g, ''));
  const { count, startCountUp } = useCountUp(numericValue);

  useEffect(() => {
    if (isInView) {
      startCountUp();
    }
  }, [isInView, startCountUp]);

  const formatCount = (num: number) => {
    if (value.includes('M')) return `${(num / 1000000).toFixed(1)}M`;
    if (value.includes('K')) return `${(num / 1000).toFixed(0)}K`;
    if (value.includes(',')) return num.toLocaleString();
    return num.toString();
  };

  return (
    <span ref={ref}>
      {prefix}{formatCount(count)}{suffix}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  AI-Powered Field Service Management
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight"
              >
                Scale Your <span className="text-blue-600 relative">
                  Trade Business
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span> with AI
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-slate-600 leading-relaxed"
              >
                ServiceVista AI helps plumbing, HVAC, electrical, and automotive service businesses 
                handle more jobs, improve efficiency, and grow revenue with intelligent automation.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
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
                  <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50">
                    Watch Demo
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-8 shadow-2xl"
              >
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80 text-sm">Emergency Call</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-red-400 rounded-full"
                    />
                  </div>
                  <h3 className="text-white font-semibold">AC Unit Down - Office Building</h3>
                  <p className="text-white/70 text-sm">Assigned to Mike Rodriguez</p>
                  <div className="mt-4 flex items-center text-white/80 text-sm">
                    <motion.svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                    ETA: 15 minutes
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-white/10 backdrop-blur rounded-lg p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-white/70 text-sm">Active Jobs</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 backdrop-blur rounded-lg p-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-white">8/12</div>
                    <div className="text-white/70 text-sm">Available Techs</div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  x: [0, 30, 0],
                  y: [0, -15, 0]
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
              
              <motion.div
                animate={{ 
                  x: [0, -25, 0],
                  y: [0, 20, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-full shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trade Types Section */}
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
              Trusted by Leading Trade Professionals
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From emergency plumbing repairs to complex HVAC installations, 
              ServiceVista AI adapts to the unique needs of every trade specialty.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tradeTypes.map((trade, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-slate-200 group-hover:border-blue-200">
                  <CardContent className="p-8 h-full flex flex-col">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {trade.icon}
                    </motion.div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {trade.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-3">{trade.customers} customers served</p>
                      <p className="text-slate-600 flex-1">{trade.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="text-3xl lg:text-4xl font-bold text-white mb-2"
                >
                  <AnimatedCounter value={stat.value} />
                </motion.div>
                <div className="text-slate-300 text-sm lg:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              AI-Driven Results That Transform Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Machine learning algorithms and predictive analytics deliver measurable improvements 
              to every aspect of your trade business operations.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group h-full"
              >
                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 h-full">
                  <motion.div
                    className="flex-shrink-0 lg:self-start"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                      {benefit.icon}
                    </div>
                  </motion.div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3 lg:mb-4">
                      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 lg:mb-0 lg:flex-1 lg:pr-4">
                        {benefit.title}
                      </h3>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 flex-shrink-0 w-fit"
                      >
                        {benefit.benefit}
                      </motion.span>
                    </div>
                    <p className="text-slate-600 leading-relaxed flex-1">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              AI-Powered Features Built for Trade Professionals
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every feature is designed with input from working plumbers, HVAC techs, electricians, 
              and automotive professionals to solve real field service challenges.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 group-hover:border-blue-200 flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-${feature.color}-100 text-${feature.color}-600 flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-slate-600 leading-relaxed flex-1">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Trade Professionals Are Saying
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real stories from plumbers, HVAC technicians, electricians, and auto repair professionals 
              who've transformed their businesses with ServiceVista AI.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur border-slate-700 hover:bg-white/10 hover:border-blue-500 transition-all duration-300">
                  <CardContent className="p-8">
                    <blockquote className="text-slate-300 mb-6 leading-relaxed mt-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="border-t border-slate-700 pt-6">
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                            {testimonial.trade}
                          </Badge>
                          <span className="text-slate-500 text-xs">{testimonial.years}</span>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                          className="flex items-center"
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ opacity: 0, rotate: -180 }}
                              whileInView={{ opacity: 1, rotate: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: (index * 0.1) + (i * 0.05) }}
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </motion.svg>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Integrates with Tools You Already Use
            </h2>
            <p className="text-slate-600">
              Seamlessly connect with your existing business software
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-colors p-4 rounded-lg hover:bg-slate-50">
                <div className="text-blue-600">{integration.icon}</div>
                <span className="font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
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
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"
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
              Ready to Scale Your Trade Business with AI?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 leading-relaxed"
            >
              Join 3,800+ successful trade businesses using ServiceVista AI to handle more jobs, 
              improve efficiency, and grow revenue with intelligent automation.
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
                  Schedule Demo
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </Button>
              </motion.div>
            </motion.div>
            <motion.p 
              variants={fadeInUp}
              className="text-blue-200 text-sm"
            >
              30-day free trial • No setup fees • Cancel anytime • Enterprise-grade security
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
