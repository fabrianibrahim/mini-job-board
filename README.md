# Job Board

A mini job board application built with Next.js, Supabase, and Tailwind CSS. Users can browse jobs, post job listings, and manage their job postings through a user-friendly dashboard.

## Live Demo

**[View Live Application](https://mini-job-board-fabrianibrahim.vercel.app/)**

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 NEXT.JS APP ROUTER                          │
│  ┌─────────────────┬─────────────────┬─────────────────┐    │
│  │  Server         │  React          │  Client         │    │
│  │  Components     │  Components     │  Components     │    │
│  │  (SSR/SSG)      │                 │  (Interactive)  │    │
│  └─────────────────┴─────────────────┴─────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 MIDDLEWARE                                  │
│              (Route Protection)                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                SUPABASE BACKEND                             │
│  ┌─────────────────┬─────────────────┬─────────────────┐    │
│  │  Auth           │  PostgreSQL     │  Row Level      │    │
│  │  System         │  Database       │  Security       │    │
│  └─────────────────┴─────────────────┴─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                     VERCEL DEPLOYMENT                        │
│              Global CDN + Edge Functions                     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Request** → Browser navigates to job board
2. **Next.js Router** → Determines route and rendering strategy
3. **Middleware** → Checks authentication for protected routes
4. **Server Components** → Fetch data server-side (SEO + Performance)
5. **Client Components** → Handle user interactions (forms, buttons)
6. **Supabase** → Store/retrieve job data with user permissions
7. **Vercel** → Serve

## Features

- **Authentication**: Secure user registration and login with Supabase Auth
- **Job Posting**: Authenticated users can create detailed job listings
- **Job Browsing**: Public job listing page with search and filtering
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **User Dashboard**: Manage, edit, and delete your job postings
- **Job Details**: View full details of a specific job

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase (Database + Authentication)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### 1. Clone the Repository

```bash
git clone
cd mini-job-board
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your keys
3. Run the SQL migration in Supabase SQL Editor:

```sql
-- Copy and paste the content from supabase/migrations/001_create_jobs_table.sql
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## More Improvements in the Future:

- Add unit tests
- Implement Apply for Job
- Implement View Company Profile
- Improve design
