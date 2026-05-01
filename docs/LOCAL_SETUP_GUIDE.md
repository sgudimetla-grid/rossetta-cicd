# Local Setup Guide

How to run the AutoElite car e-commerce application on your local machine.

## Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)
- Git

Check your versions:

```bash
node --version    # should show v20.x or higher
npm --version     # should show 10.x or higher
git --version
```

If you don't have Node.js installed:

```bash
# macOS (using Homebrew)
brew install node@20

# Or use nvm (recommended for managing multiple versions)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 20
nvm use 20
```

## Step 1: Clone the repository

```bash
git clone git@github.com-grid:sgudimetla-grid/rossetta-cicd.git
cd rossetta-cicd
```

## Step 2: Install dependencies

```bash
npm install
```

This installs Next.js, React, and other dependencies listed in `package.json`.
You should see a `node_modules/` directory and a `package-lock.json` file after this.

## Step 3: Run the development server

```bash
npm run dev
```

You should see output like:

```
   ▲ Next.js 15.3.2
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 1.5s
```

Open http://localhost:3000 in your browser.

The dev server supports hot reload -- any code changes you save will appear immediately in the browser without restarting.

## Step 4: Explore the application

| Page | URL | What you see |
|---|---|---|
| Home | http://localhost:3000 | Hero section + 3 featured cars |
| All Cars | http://localhost:3000/cars | Full catalog with category filters (Electric, Sports, SUV) |
| Car Detail | http://localhost:3000/cars/1 | Detailed specs for a specific car (change the number 1-9) |
| Cart | http://localhost:3000/cart | Shopping cart (empty until you add cars) |
| Checkout | http://localhost:3000/checkout | Checkout form with personal info, address, payment |

### Try the full flow

1. Go to http://localhost:3000/cars
2. Click a category filter (e.g., "Electric")
3. Click "Add to Cart" on any car
4. Click the "Cart" link in the header (you'll see a badge with item count)
5. Adjust quantity or remove items
6. Click "Proceed to Checkout"
7. Fill in the form and click "Place Order"
8. You'll see an order confirmation page

## Running a production build locally

To test exactly what gets deployed to Kubernetes:

```bash
# Build the optimized production version
npm run build

# Start the production server
npm start
```

Open http://localhost:3000. This version is faster but does not support hot reload.

## Running with Docker locally

If you want to test the Docker image that the Tekton pipeline builds:

```bash
# Build the image
docker build -t nextjs-app .

# Run the container
docker run -p 3000:3000 nextjs-app
```

Open http://localhost:3000.

To stop the container:

```bash
# Find the container ID
docker ps

# Stop it
docker stop <container-id>
```

## Project structure

```
rossetta-cicd/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout (header, footer, cart provider)
│   ├── globals.css         # All styles (dark theme, responsive)
│   ├── page.js             # Home page
│   ├── cars/
│   │   ├── page.js         # Car catalog with filters
│   │   └── [id]/page.js    # Car detail page
│   ├── cart/page.js        # Shopping cart
│   └── checkout/page.js    # Checkout form
├── components/             # Reusable UI components
│   ├── Header.js           # Sticky navigation with cart badge
│   ├── Footer.js           # Site footer
│   └── CarCard.js          # Car card with add-to-cart
├── lib/                    # Data and state management
│   ├── cars.js             # Car inventory (9 cars) + helper functions
│   └── cartContext.js      # React context for cart state
├── public/                 # Static assets
├── tekton/                 # CI/CD pipeline definitions
├── docs/                   # Documentation
├── Dockerfile              # Multi-stage production Docker build
├── next.config.mjs         # Next.js configuration (standalone output)
├── jsconfig.json           # Path aliases (@/ -> project root)
├── package.json            # Dependencies and scripts
└── .gitignore              # Files excluded from Git
```

## Available npm scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start development server with hot reload on port 3000 |
| `npm run build` | Create optimized production build in `.next/` |
| `npm start` | Start production server (run `npm run build` first) |
| `npm run lint` | Run ESLint to check for code issues |

## Common issues

### Port 3000 is already in use

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Module not found errors

Make sure you ran `npm install` first. If the error persists:

```bash
# Remove node_modules and reinstall
rm -rf node_modules .next
npm install
```

### Images not loading

The car images come from Unsplash (external URLs). Make sure you have internet access.
If you're behind a corporate proxy, the images may be blocked -- the app will still work, just without images.

### Build fails

```bash
# Clean build artifacts and rebuild
rm -rf .next
npm run build
```

If the error mentions memory, increase Node.js memory:

```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```
