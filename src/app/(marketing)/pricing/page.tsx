import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const pricingPlans = [
  {
    name: "Starter",
    price: "$199",
    period: "per technician/month",
    description: "Essential tools for growing trade businesses",
    features: [
      "AI-powered dispatching",
      "Smart scheduling",
      "Call booking & management",
      "Mobile invoicing",
      "Basic price book",
      "Payment processing",
      "Mobile app access",
      "Email support"
    ],
    popular: false,
    badge: "Get Started",
    tradeExamples: ["2-5 technician companies", "Independent trade contractors", "Small service businesses"],
    minTechs: "2 technician minimum"
  },
  {
    name: "Professional",
    price: "$229",
    period: "per technician/month",
    description: "Advanced features for established businesses",
    features: [
      "Everything in Starter",
      "Advanced AI dispatch board",
      "Smart inventory management", 
      "Customer portal access",
      "AI-powered analytics",
      "Maintenance agreements",
      "Priority phone support",
      "Multi-location support",
      "Custom reporting"
    ],
    popular: true,
    badge: "Most Popular",
    tradeExamples: ["5-15 technician companies", "Multi-crew operations", "Growing trade businesses"],
    minTechs: "3 technician minimum"
  },
  {
    name: "Enterprise",
    price: "$269",
    period: "per technician/month",
    description: "Complete solution for large trade operations",
    features: [
      "Everything in Professional",
      "Advanced AI & machine learning",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom training program",
      "API access",
      "White-label options",
      "Advanced workflow automation",
      "Enterprise reporting suite"
    ],
    popular: false,
    badge: "Full Suite",
    tradeExamples: ["15+ technician companies", "Multi-location businesses", "Franchise operations"],
    minTechs: "5 technician minimum"
  }
];

const faqs = [
  {
    question: "Can I try ServiceVista AI before committing?",
    answer: "Absolutely! We offer a full 30-day free trial with no credit card required. You'll have access to all features and can cancel anytime."
  },
  {
    question: "How quickly can my trade business get set up?",
    answer: "Most trade businesses are up and running within 24-48 hours. We provide free setup assistance and data migration from your existing systems."
  },
  {
    question: "Do you integrate with QuickBooks and other accounting software?",
    answer: "Yes! We integrate with QuickBooks, Xero, and other popular accounting platforms. Financial data syncs automatically to keep your books current."
  },
  {
    question: "What if I have technicians who aren't tech-savvy?",
    answer: "Our mobile app is designed specifically for field technicians - it's simple and intuitive. We also provide training to ensure your whole team is comfortable with the system."
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at your next billing cycle."
  },
  {
    question: "Is my customer data secure?",
    answer: "Security is our top priority. We use bank-level encryption, regular security audits, and comply with all major data protection regulations."
  }
];

const addOns = [
  {
    name: "Marketing Pro",
    price: "$49/month",
    description: "Advanced marketing automation, campaign tracking, and lead attribution"
  },
  {
    name: "Fleet Management",
    price: "$79/month", 
    description: "GPS tracking, vehicle maintenance scheduling, and fuel monitoring"
  },
  {
    name: "Advanced Reporting Suite",
    price: "$99/month",
    description: "Custom dashboards, P&L by job, technician performance analytics"
  },
  {
    name: "White Label & API Access",
    price: "$199/month",
    description: "Custom branded portal, API access, and advanced third-party integrations"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="info" className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Simple, transparent pricing
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Professional Pricing for <span className="text-blue-600">Trade Businesses</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Transparent per-technician pricing that scales with your business. 
            Get premium AI-powered field service management starting at $199 per technician/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-shadow">
              Start 30-Day Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50">
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 shadow-xl scale-105 bg-blue-50 border-2' 
                  : 'border-slate-200 shadow-lg hover:border-blue-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="bg-blue-600 text-white shadow-md">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className="text-sm text-blue-600 font-medium mb-2">{plan.badge}</div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-slate-600 ml-2">/{plan.period}</span>}
                  </div>
                  <CardDescription className="text-base mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-slate-700 font-medium">{plan.minTechs}</p>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Perfect for:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {plan.tradeExamples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full shadow-md hover:shadow-lg transition-all ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-slate-300 hover:bg-slate-50'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Start 30-Day Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-600 mb-6 text-lg">
              All plans include setup assistance and onboarding for your trade business
            </p>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-slate-600 p-3 rounded-lg bg-slate-50">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-600 p-3 rounded-lg bg-slate-50">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-600 p-3 rounded-lg bg-slate-50">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Data migration included</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-slate-600 p-3 rounded-lg bg-slate-50">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Dedicated trade specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-slate-600">
              Enhance your plan with additional features as your business grows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="text-center shadow-md hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{addon.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions from trade business owners
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
              Talk to a Trade Specialist
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Trade Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your 30-day free trial today. No credit card required, no setup fees, 
            and free onboarding assistance from our trade specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="!bg-white !text-blue-600 hover:!bg-slate-100 shadow-lg hover:shadow-xl transition-all font-semibold border-0">
              Start Free 30-Day Trial
            </Button>
            <Button size="lg" variant="outline" className="!border-2 !border-white !text-white !bg-transparent hover:!bg-white hover:!text-blue-600 shadow-lg hover:shadow-xl transition-all font-semibold">
              Schedule Demo Call
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            Join 3,800+ trade businesses already using ServiceVista AI
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
} 