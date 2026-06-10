# BlockQuery.io

Productized on-chain intelligence — wallet screening, transaction forensics, KYT and sanctioned-jurisdiction analysis for exchanges, regulators, compliance teams, and asset-recovery practitioners.

**Live Site**: https://investigations-cl.netlify.app


## 🌟 Features

- **Blockchain Investigation Services**: Professional digital asset tracing and investigation
- **Self-Service Reports**: Automated blockchain analysis reports starting at $99
- **3D Network Visualizations**: Interactive blockchain network and globe visualizations using Three.js
- **Contact Management**: Secure contact form with reCAPTCHA validation
- **Payment Integration**: Integrated with Mollie payment gateway
- **Responsive Design**: Mobile-first design with beautiful UI components
- **Dark Mode Support**: Fully themed dark/light mode support
- **SEO Optimized**: Comprehensive SEO implementation with meta tags and analytics

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Three Fiber** - 3D graphics with Three.js
- **Shadcn UI** - Component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Backend & Services
- **Supabase** - Backend as a Service
  - Database (PostgreSQL)
  - Edge Functions (Deno)
  - Authentication
- **Mollie** - Payment processing
- **Google reCAPTCHA** - Bot protection
- **Google Analytics** - Web analytics

## 📋 Prerequisites

- Node.js 18+ or Bun
- Supabase account
- Google reCAPTCHA keys (v2 Checkbox)
- Mollie payment account (for payment processing)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd blockquery
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration (REQUIRED)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# reCAPTCHA Configuration (REQUIRED)
# Get keys from: https://www.google.com/recaptcha/admin
VITE_RECAPTCHA_SITE_KEY=6Le...your_key_here...

# Environment (optional, defaults to production)
VITE_ENV=development
```

**Finding your Supabase credentials**:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Settings > API
4. Copy the Project URL and anon key

4. **Set up Supabase secrets** (for Edge Functions)

In your Supabase project dashboard:
1. Navigate to Settings > Edge Functions > Secrets
2. Add the following secret:
   - **Key**: `RECAPTCHA_SECRET_KEY`
   - **Value**: Your Google reCAPTCHA secret key (from reCAPTCHA admin panel)

**Note**: These secrets are used by the Edge Functions for server-side validation.

5. **Run the development server**
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:8080` (or the next available port if 8080 is in use).

**Troubleshooting**: If the dev server won't start, check that port 8080 is not already in use:
```bash
# macOS/Linux
lsof -i :8080

# Windows
netstat -ano | findstr :8080
```

## 🗄️ Database Schema

All tables are located in the Supabase PostgreSQL database. Row Level Security (RLS) is enabled.

### Tables

#### `contact_submissions`
Stores contact form submissions from potential clients.
```
- id (UUID, primary key)
- company_name (text)
- contact_email (email)
- message (text)
- created_at (timestamp)
```

#### `self_service_reports`
Stores self-service report requests with pricing options.
```
- id (UUID, primary key)
- client_email (email)
- blockchain_address (text)
- report_type (text)
- amount (numeric)
- currency (text)
- status (text, default: 'pending')
- created_at (timestamp)
- updated_at (timestamp)
```

**Note**: View current schema in Supabase Dashboard > SQL Editor or check `supabase/migrations/`

### Migrations

Database changes are managed through migrations in `supabase/migrations/`.

To create a new migration:
```bash
supabase migration new create_new_table
```

To apply migrations locally:
```bash
supabase db pull  # Pull remote schema
supabase db push  # Push local migrations
```

## 🔧 Development

### Project Structure

```
blockquery/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components (Shadcn)
│   │   └── ...         # Feature components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party integrations
│   │   └── supabase/   # Supabase client and types
│   ├── lib/            # Utility functions
│   ├── pages/          # Route pages
│   ├── App.tsx         # Main app component
│   ├── index.css       # Global styles and design tokens
│   └── main.tsx        # Application entry point
├── supabase/
│   ├── functions/      # Edge Functions
│   │   ├── submit-contact/
│   │   └── submit-self-service-report/
│   ├── migrations/     # Database migrations
│   └── config.toml     # Supabase configuration
├── public/             # Public static files
└── index.html          # HTML entry point
```

### Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build for production (optimized bundle)
- `npm run build:dev` - Build for development (unminified)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint and check code quality

### Key Features & Where to Find Them

| Feature | Location |
|---------|----------|
| Home page | `src/pages/Home.tsx` |
| Contact form | `src/pages/Contact.tsx` |
| Self-service reports | `src/pages/SelfServiceReports.tsx` |
| Navigation | `src/components/Navigation.tsx` |
| 3D visualizations | `src/components/Globe3D.tsx`, `src/components/NetworkVisualization.tsx` |
| Form validation | `src/lib/validation.ts` |
| Supabase client | `src/integrations/supabase/client.ts` |
| Edge Functions | `supabase/functions/` |

### Adding New Pages

1. Create a new component in `src/pages/YourPage.tsx`
2. Add the route in `src/App.tsx`:
   ```typescript
   import YourPage from './pages/YourPage'
   
   // Inside the routes array:
   { path: '/your-page', element: <YourPage /> }
   ```
3. Update navigation in `src/components/Navigation.tsx`

### Modifying Forms

All forms use **React Hook Form** for management and **Zod** for validation:

1. Update validation schema in `src/lib/validation.ts`
2. Import and use the schema in your form component
3. Forms automatically submit to Supabase Edge Functions
4. Add server-side validation in `supabase/functions/`

### Working with Supabase Edge Functions

Edge Functions handle backend logic:

- **Location**: `supabase/functions/`
- **Language**: TypeScript (Deno runtime)
- **Deployment**: `supabase functions deploy [function-name]`
- **Secrets**: Accessed via `Deno.env.get('SECRET_NAME')`

To add a new function:
1. Create `supabase/functions/function-name/index.ts`
2. Add to `.env` and call from frontend via `supabase.functions.invoke()`

### Styling Guidelines

- Use semantic tokens from `index.css` for colors
- Utilize Tailwind CSS utility classes
- Customize Shadcn components via variants
- Maintain HSL color format for theming
- Ensure dark mode compatibility

## 🚀 Deployment

### Deploy to Lovable

1. Click the **Publish** button in the Lovable editor
2. Your app will be deployed to a Lovable subdomain

### Deploy to Custom Hosting

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)

3. Set up environment variables in your hosting platform

4. Deploy Supabase Edge Functions:
```bash
supabase functions deploy submit-contact
supabase functions deploy submit-self-service-report
```

### Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains in Lovable
2. Follow the DNS configuration instructions
3. Note: A paid Lovable plan is required for custom domains

## 🔐 Security

- All forms are protected with Google reCAPTCHA v2
- Supabase Row Level Security (RLS) policies are enabled on all tables
- Environment variables are used for sensitive data (never commit `.env`)
- Edge Functions validate all inputs server-side
- Never store sensitive keys in components or frontend code
- Always use HTTPS in production
- Validate data on both frontend (UX) and backend (security)

### Security Checklist for Changes

- [ ] No secrets committed to git
- [ ] Form inputs validated server-side
- [ ] CORS properly configured
- [ ] SQL queries use parameterized queries (Supabase handles this)
- [ ] File uploads are sanitized
- [ ] User data is properly authenticated

## 📊 Analytics

Google Analytics is configured with measurement ID: `G-G22TK39B26`

Track user interactions and page views through the Google Analytics dashboard.

## 🎨 Design System

The project uses a comprehensive design system defined in `src/index.css` and `tailwind.config.ts`:

- **Color Tokens**: Semantic color variables for theming
- **Typography**: Inter font family with multiple weights
- **Components**: Shadcn UI components with custom variants
- **Animations**: Smooth transitions and custom animations
- **Responsive**: Mobile-first breakpoints

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and test locally:
   ```bash
   npm run dev
   npm run lint  # Check for issues
   ```

3. **Commit with descriptive messages**:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with X"
   git commit -m "docs: update README"
   ```

4. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Steps to test the changes
   - Any new environment variables needed

### Code Standards

- Use **TypeScript** for type safety
- Follow existing code style (ESLint auto-fixes with `npm run lint`)
- Keep components focused and reusable
- Use meaningful variable and function names
- Add comments only for complex logic
- Test changes locally before pushing

### Deployment Notes

- **Main branch** is automatically deployed to Netlify
- **Pull requests** get automatic preview deployments
- Test thoroughly before merging to main
- Check the live site: https://investigations-cl.netlify.app

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 🔗 Important Links

### Production
- **Live Website**: https://investigations-cl.netlify.app
- **Netlify Dashboard**: https://app.netlify.com

### Development & Backend
- **Supabase Project**: https://supabase.com/dashboard/project/[your-project-id]
- **Supabase Documentation**: https://supabase.com/docs

### External Services
- **Google reCAPTCHA Admin**: https://www.google.com/recaptcha/admin
- **Google Analytics**: https://analytics.google.com
- **Mollie Dashboard**: https://dashboard.mollie.com

### Documentation
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn UI**: https://ui.shadcn.com
- **Three.js**: https://threejs.org

## 🔧 Troubleshooting

### Common Issues

**Port 8080 already in use**
```bash
# Find and kill the process
lsof -i :8080
kill -9 [PID]
```

**Dependencies not installed**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Vite build failing**
```bash
# Clear Vite cache
rm -rf dist .vite
npm run build
```

**Supabase connection issues**
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Verify network connection to Supabase servers
- Check Supabase project status in dashboard

**reCAPTCHA validation failing**
- Verify domain is registered in reCAPTCHA admin console
- Check `RECAPTCHA_SECRET_KEY` is set in Supabase secrets
- Ensure `VITE_RECAPTCHA_SITE_KEY` matches your reCAPTCHA key

**Edge Functions not deploying**
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login and deploy
supabase functions deploy submit-contact
supabase functions deploy submit-self-service-report
```

### Getting Help

- Check console errors in browser DevTools (F12)
- Review server logs: `npm run dev` shows Vite logs
- Check Supabase logs in dashboard > Logs > Functions
- Search GitHub issues in the repository

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI Components by [Shadcn UI](https://ui.shadcn.com)
- 3D Graphics by [Three.js](https://threejs.org) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Backend powered by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)

---

**Note**: Replace placeholder URLs, keys, and project-specific information with your actual values before deploying to production.
