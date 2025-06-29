'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: "Trade Businesses Served", value: "3,800+" },
  { label: "Service Calls Managed", value: "2.1M+" },
  { label: "Years of Trade Experience", value: "25+" },
  { label: "Customer Satisfaction", value: "98.7%" }
];

const timeline = [
  {
    year: "2019",
    title: "The Problem Becomes Clear",
    description: "Jose Coyt, a former mechanic and plumber with years of hands-on experience, grew frustrated with existing software that didn't understand how trade businesses actually work."
  },
  {
    year: "2020", 
    title: "Building the Foundation",
    description: "Started development with input from 50+ trade professionals. Every feature designed with real-world trade scenarios and field testing from automotive and plumbing perspectives."
  },
  {
    year: "2021",
    title: "Beta Testing with Trade Partners",
    description: "Launched closed beta with 25 established trade businesses. Refined features based on daily feedback from plumbers, electricians, mechanics, and HVAC contractors."
  },
  {
    year: "2022",
    title: "Official Launch",
    description: "ServiceVista AI goes live, serving established trade businesses with a platform built specifically for their industry's unique needs."
  },
  {
    year: "2023", 
    title: "Rapid Growth & Industry Recognition",
    description: "Reached 1,000+ trade businesses and expanded to serve automotive, appliance repair, and locksmith professionals across North America."
  },
  {
    year: "2024",
    title: "AI-Powered Intelligence",
    description: "Introduced predictive analytics and AI-driven dispatch optimization. Now serving 3,800+ trade businesses with advanced automation tools."
  }
];

const team = [
  {
    name: "Jose Coyt",
    role: "Founder, CEO",
    background: "Former Mechanic & Plumber",
    description: "Years of hands-on experience as a mechanic and plumber before founding ServiceVista AI. Leads both company strategy and technical development, ensuring the platform meets real-world trade needs.",
    expertise: "Trade operations, automotive repair, plumbing systems, software architecture"
  },
  {
    name: "Sarah Chen",
    role: "VP of Product", 
    background: "Ex-Electrician & Software Engineer",
    description: "Started as a journeyman electrician, then earned her CS degree. Bridges the gap between trade work and technology solutions.",
    expertise: "Mobile applications, field technician tools"
  },
  {
    name: "David Martinez",
    role: "Head of Customer Success",
    background: "Former Plumbing Business Owner",
    description: "Sold his successful plumbing company to help other trade professionals leverage technology for growth and efficiency.",
    expertise: "Trade business growth, customer onboarding"
  },
  {
    name: "Jennifer Walsh",
    role: "Senior Software Architect",
    background: "Enterprise Software Architect",
    description: "15 years building scalable systems for field service industries. Specializes in real-time tracking and mobile-first architecture.",
    expertise: "System architecture, GPS tracking, payments"
  }
];

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Trade-First Approach",
    description: "Every feature is designed with input from working trade professionals. We understand your business because we've lived it."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Reliability You Can Trust",
    description: "When your customer calls at 2 AM, our platform needs to work flawlessly. We built enterprise-grade reliability for trade businesses."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Growth-Focused Solutions",
    description: "We don't just manage your current operations – we help you grow your business with data-driven insights and automation."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5l3 3-3 3m5-6h5" />
      </svg>
    ),
    title: "Partnership, Not Just Software",
    description: "We're committed to your success with dedicated trade specialists, free training, and ongoing support that understands your industry."
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
  
  // Better parsing logic to handle decimals and suffixes
  const parseValue = (val: string) => {
    const cleanValue = val.replace(/[^\d.]/g, ''); // Keep digits and decimal points
    const numericBase = parseFloat(cleanValue) || 0;
    
    if (val.includes('M')) {
      return Math.floor(numericBase * 1000000);
    } else if (val.includes('K')) {
      return Math.floor(numericBase * 1000);
    } else if (val.includes('%')) {
      return Math.floor(numericBase * 10); // For percentage animation
    } else if (val.includes(',')) {
      return parseInt(val.replace(/[^\d]/g, '')) || 0;
    }
    return Math.floor(numericBase);
  };
  
  const numericValue = parseValue(value);
  const { count, startCountUp } = useCountUp(numericValue);

  useEffect(() => {
    if (isInView) {
      startCountUp();
    }
  }, [isInView, startCountUp]);

  const formatCount = (num: number) => {
    if (value.includes('M')) {
      return `${(num / 1000000).toFixed(1)}M${value.includes('+') ? '+' : ''}`;
    }
    if (value.includes('K')) {
      return `${(num / 1000).toFixed(0)}K${value.includes('+') ? '+' : ''}`;
    }
    if (value.includes('%')) {
      return `${(num / 10).toFixed(1)}%`;
    }
    if (value.includes(',')) {
      return `${num.toLocaleString()}${value.includes('+') ? '+' : ''}`;
    }
    if (value.includes('+')) {
      return `${num}+`;
    }
    return num.toString();
  };

  return (
    <span ref={ref}>
      {prefix}{formatCount(count)}{suffix}
    </span>
  );
}

export default function AboutPage() {
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
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </motion.svg>
                Founded by trade professionals
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              Built by <span className="text-blue-600 relative">
                Trade Professionals
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>, for Trade Professionals
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 mb-8"
            >
              ServiceVista AI was founded by people who understand the challenges of running 
              a trade business because they've lived it. Every feature comes from real-world 
              experience in plumbing, HVAC, electrical, and automotive repair.
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
                  Meet Our Team
                </Button>
              </motion.div>
            </motion.div>
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

      {/* Founder Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                The Story Behind ServiceVista AI
              </h2>
              <motion.div 
                className="space-y-6 text-lg text-slate-600 leading-relaxed"
                variants={staggerContainer}
              >
                <motion.p variants={fadeInUp}>
                  In 2019, Jose Coyt was working as a mechanic and plumber, handling everything from emergency 
                  plumbing repairs to complex automotive diagnostics. With years of hands-on experience in both trades, 
                  he had developed a deep understanding of field service challenges. But he was frustrated.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  The software solutions available were either too generic for trade work or too complex 
                  for field technicians to use effectively. He needed something that understood the realities 
                  of emergency calls, parts inventory management, and the unique challenges of managing service 
                  appointments across different trade specialties.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  "I spent more time wrestling with clunky software than focusing on quality service," Jose recalls. 
                  "That's when I realized that to build the right solution, you need people who've actually 
                  crawled under sinks and worked with their hands to solve real problems."
                </motion.p>
                <motion.p variants={fadeInUp}>
                  So Jose transitioned from the field to technology, partnering with other experienced trade professionals 
                  to build ServiceVista AI – field service management software designed by people who 
                  understand your business from the ground up.
                </motion.p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-xl border-slate-200 overflow-hidden">
                  <motion.div 
                    className="bg-blue-600 p-8 text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-3xl font-bold">JC</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Jose Coyt</h3>
                    <p className="text-blue-100 mb-4">Founder, CEO & VP of Engineering</p>
                    <motion.p 
                      className="text-blue-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      "We built ServiceVista AI because we know what it's like to work in the trades. 
                      Every feature solves a real problem we've faced hands-on in the field."
                    </motion.p>
                  </motion.div>
                  <CardContent className="p-8 mt-5">
                    <motion.div 
                      className="space-y-4"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-slate-600">Former Plumber & Mechanic</span>
                      </motion.div>
                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-slate-600">10+ Years Field Experience</span>
                      </motion.div>
                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span className="text-slate-600">Software Engineering Background</span>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Journey from Trade Floor to Tech Leader
            </h2>
            <p className="text-xl text-slate-600">
              How real-world trade experience shaped the future of field service management
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-8 top-0 w-px bg-blue-200"
              style={{ height: 'calc(100% - 4rem)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative flex items-start space-x-6"
                >
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.year}
                  </motion.div>
                  <motion.div
                    className="flex-1 pb-8"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-slate-200">
                      <CardContent className="p-6 mt-4">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet the Trade Professionals Behind the Technology
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our leadership team combines decades of hands-on trade experience with 
              cutting-edge technology expertise to deliver solutions that actually work.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {team.map((member, index) => (
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
                  <CardContent className="p-8 mt-4">
                    <div className="flex items-start space-x-6">
                      <motion.div
                        className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                        <p className="text-slate-600 text-sm mb-3 font-medium">{member.background}</p>
                        <p className="text-slate-600 mb-4 leading-relaxed">{member.description}</p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                            {member.expertise}
                          </Badge>
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

      {/* Values Section */}
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
              Our Values Drive Everything We Build
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These principles guide every decision we make, from product development 
              to customer support, ensuring we stay true to our trade professional roots.
            </p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 group-hover:border-blue-200 bg-white">
                  <CardContent className="p-8 mt-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
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
              Ready to Work with People Who Get It?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 leading-relaxed"
            >
              Experience the difference of working with a team that understands the trades. 
              Start your free trial today and see why trade professionals choose ServiceVista AI.
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
                  Talk to Our Team
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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