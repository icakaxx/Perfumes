# Luxe Parfum - Luxury Perfume E-commerce

A modern, responsive e-commerce website for luxury perfumes built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Product Catalog**: Browse perfumes with advanced filtering and search
- **Shopping Experience**: Add to cart, order placement, and order tracking
- **Admin Panel**: Secure admin interface for managing products and orders
- **Security**: Comprehensive security measures including CSRF protection, rate limiting, and secure authentication
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Type Safety**: Full TypeScript support throughout the application
- **Performance**: Optimized with Next.js App Router and Image optimization

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks and local state

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── order/             # Order page
│   ├── shop/              # Shop page
│   ├── success/           # Success page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── NavBar.tsx        # Navigation component
│   ├── Footer.tsx        # Footer component
│   ├── PerfumeCard.tsx   # Product card component
│   └── FiltersSheet.tsx  # Filter sidebar component
├── data/                 # Static data
│   └── products.ts       # Product catalog
├── hooks/                # Custom hooks
│   └── use-toast.ts     # Toast notification hook
└── lib/                  # Utility functions
    ├── utils.ts         # General utilities
    └── format.ts        # Formatting functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd perfumes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file with your configuration
cp .env.example .env.local
# Edit .env.local with your Supabase credentials and admin credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Admin Authentication (REQUIRED)
ADMIN_USERNAME=your_secure_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# Application Environment
NODE_ENV=development
```

**⚠️ Important**: Set secure admin credentials before deploying to production!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### Home Page (`/`)
- Hero section with call-to-action
- Featured products showcase
- Value propositions
- Category navigation

### Shop Page (`/shop`)
- Product grid with filtering
- Search functionality
- Advanced filters (price, concentration, notes, etc.)
- Sorting options
- Responsive product cards

### Order Page (`/order`)
- Product selection and quantity
- Customer information form
- Order summary with pricing
- Secure order processing

### Success Page (`/success`)
- Order confirmation
- Order details display
- Next steps information
- Navigation back to shop

## API Routes

### Orders API (`/api/orders`)
- `POST` - Submit new order (with CSRF protection)
- `GET` - API health check

### Admin API (`/api/admin`)
- `POST /auth` - Admin login (with CSRF protection)
- `DELETE /auth` - Admin logout
- `GET /session` - Check admin session status

### Security Features
- **CSRF Protection**: All POST/DELETE endpoints protected
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Zod schemas for all user inputs
- **Secure Headers**: CSP, HSTS, X-Frame-Options, etc.
- **Session Security**: httpOnly cookies with secure settings

## Features in Detail

### Product Filtering
- Filter by concentration (EDT, EDP, Parfum)
- Filter by gender profile (Feminine, Masculine, Unisex)
- Filter by fragrance notes (Top, Heart, Base)
- Price range filtering
- In-stock filtering
- Search by name, brand, or description

### Shopping Experience
- Product detail views
- Variant selection (different sizes)
- Quantity selection
- Order form with validation
- Order confirmation and tracking

### Design System
- Custom color palette with gold accent
- Typography with Inter and Playfair Display fonts
- Consistent spacing and component styling
- Dark mode support
- Responsive breakpoints

## Customization

### Adding New Products
Use the admin panel at `/admin/perfumes` to add new products to the catalog.

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Tailwind classes in component files
- Theme configuration: `tailwind.config.js`

### Components
All UI components are built with Radix UI primitives and styled with Tailwind CSS for maximum customization.

## Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting service

Build the project:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

# parfume-store
