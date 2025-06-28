# ServiceVista AI - App Structure

This document explains the organized structure of the Next.js app directory.

## 📁 Directory Structure

```
src/app/
├── (dashboard)/          # Dashboard & Analytics Routes
│   ├── dashboard/        # Main dashboard for all roles
│   └── analytics/        # Business analytics & reports
│
├── (operations)/         # Core Business Operations
│   ├── jobs/            # Job management & tracking
│   │   └── [jobId]/     # Individual job details
│   ├── customers/       # Customer management
│   │   └── [customerId]/ # Individual customer details
│   ├── employees/       # Employee management
│   └── calendar/        # Scheduling & calendar
│
├── (sales)/             # Sales & Quotes
│   └── quotes/          # Quote management
│       ├── new/         # Create new quotes
│       └── [quoteId]/   # Individual quote details
│
├── (marketing)/         # Marketing & Public Pages
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── features/        # Features page
│   └── pricing/         # Pricing page
│
├── admin/               # Administrative Functions
│   ├── users/           # User management
│   ├── roles/           # Role management
│   ├── settings/        # System settings
│   ├── security/        # Security settings
│   ├── backup/          # Backup management
│   └── api/             # API management
│
├── login/               # Authentication
├── portal/              # Client portal
├── page.tsx             # Landing page
├── layout.tsx           # Root layout
├── globals.css          # Global styles
└── favicon.ico          # Site favicon
```

## 🎯 Route Groups Explanation

### (dashboard) - Business Intelligence
- **dashboard/**: Role-based dashboards for all user types
- **analytics/**: Reporting and business analytics

### (operations) - Day-to-Day Operations
- **jobs/**: Complete job lifecycle management
- **customers/**: Customer relationship management
- **employees/**: Staff management and scheduling
- **calendar/**: Appointment and task scheduling

### (sales) - Sales Management
- **quotes/**: Quote creation, management, and tracking

### (marketing) - Public-Facing Pages
- **about/**: Company information
- **contact/**: Contact forms and information
- **features/**: Product features showcase
- **pricing/**: Pricing information

### admin/ - System Administration
- Comprehensive admin panel with user, role, and system management
- Security and backup functionality
- API management

## 🔧 Benefits of This Structure

1. **Logical Grouping**: Related functionality is grouped together
2. **Clean URLs**: Route groups don't affect URL structure
3. **Scalability**: Easy to add new features within existing groups
4. **Maintainability**: Clear separation of concerns
5. **No Empty Folders**: Removed all unused component/hook directories

## 🚀 Adding New Features

- **Dashboard feature**: Add to `(dashboard)/`
- **Operational feature**: Add to `(operations)/`
- **Sales feature**: Add to `(sales)/`
- **Marketing page**: Add to `(marketing)/`
- **Admin feature**: Add to `admin/`

This structure follows Next.js 13+ App Router best practices and provides a clean, maintainable codebase. 