# Luxe Parfum - Luxury Perfume E-commerce

A modern, responsive e-commerce website for luxury perfumes built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Product Catalog**: Browse perfumes with advanced filtering and search
- **Shopping Experience**: Add to cart, order placement, and order tracking
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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- `POST` - Submit new order
- `GET` - API health check

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
