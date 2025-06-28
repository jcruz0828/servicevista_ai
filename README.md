# ServiceVista AI

A comprehensive field service management platform built with modern web technologies. ServiceVista AI streamlines operations, optimizes scheduling, and maximizes customer satisfaction for service-based businesses.

## ✨ Features

### 🎯 Core Modules
- **Smart Dispatch Dashboard** - AI-powered job assignment with real-time technician tracking
- **Job Management** - Complete job lifecycle from creation to completion
- **Customer Management** - Comprehensive customer profiles and service history
- **Quote & Proposal Generator** - Professional estimates with dynamic pricing
- **Analytics & Reports** - Real-time insights into business performance

### 🔐 Role-Based Access Control
- **Administrator** - Full system access and user management
- **Office Manager** - Day-to-day operations oversight
- **Dispatcher** - Job assignment and technician coordination
- **Customer Service Rep** - Customer interactions and basic job creation
- **Field Technician** - Mobile access to assigned jobs
- **Accountant** - Financial reports and reconciliation
- **Sales Representative** - Quotes and opportunity management
- **Client Portal** - Customer self-service portal

### 🎨 Design System
- **Brand Colors**: Blue (#2563EB), Sky Blue (#38BDF8), Sun Yellow (#FACC15)
- **Typography**: Inter font family with responsive scale
- **Components**: shadcn/ui with Radix primitives
- **Dark Mode**: Automatic theme switching support

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Radix UI primitives
- **State Management**: Zustand v4 (slice-based)
- **Data Fetching**: TanStack Query v5
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: React-Leaflet (optional)

### Authentication
- **Provider**: ServiceTitan OAuth
- **Library**: NextAuth.js v5 (Credentials & Refresh-token flow)

### Development & Testing
- **Build Tool**: Next.js with TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright
- **Git Hooks**: Husky + lint-staged

### Deployment
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Environment**: Edge runtime support

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servicevista-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables (see Environment Variables section)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run unit tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dispatcher dashboard
│   ├── jobs/              # Job management
│   ├── customers/         # Customer management
│   ├── quotes/            # Quote generation
│   ├── analytics/         # Reports and analytics
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── maps/             # Map components
├── lib/                  # Utilities and configurations
│   ├── auth/             # Authentication logic
│   ├── db/               # Database utilities
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
└── __tests__/            # Test files
    ├── unit/             # Unit tests
    ├── e2e/              # End-to-end tests
    └── fixtures/         # Test data
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# ServiceTitan OAuth
SERVICETITAN_CLIENT_ID=your-client-id
SERVICETITAN_CLIENT_SECRET=your-client-secret
SERVICETITAN_TENANT_ID=your-tenant-id

# Database (if using)
DATABASE_URL=your-database-url

# API Configuration
API_BASE_URL=your-api-base-url
```

### Authentication Setup

ServiceVista AI uses ServiceTitan OAuth for authentication. To set up:

1. Register your application with ServiceTitan
2. Obtain your client credentials
3. Configure the OAuth callback URLs
4. Update environment variables

## 🧪 Testing

### Unit Tests
```bash
npm run test                # Run all unit tests
npm run test:coverage       # Run with coverage report
```

### End-to-End Tests
```bash
npm run test:e2e           # Run E2E tests headless
npm run test:e2e:ui        # Run E2E tests with UI
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build              # Build the application
npm run start              # Start production server
```

## 📖 API Documentation

The application communicates with ServiceTitan APIs for data management. Key endpoints include:

- `/api/auth/*` - Authentication routes (NextAuth.js)
- `/api/jobs` - Job management
- `/api/customers` - Customer data
- `/api/quotes` - Quote generation
- `/api/analytics` - Business intelligence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use the established component patterns
- Write tests for new features
- Follow the existing code style
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🗺️ Roadmap

- [ ] Advanced AI-powered scheduling
- [ ] Mobile app for technicians
- [ ] Advanced reporting dashboard
- [ ] Integration with accounting software
- [ ] Customer portal enhancements
- [ ] Inventory management module
- [ ] Advanced GPS tracking features
- [ ] Machine learning insights
