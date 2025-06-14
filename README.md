# Nestfield Holdings Backend

A RESTful API backend for a cryptocurrency investment platform built with NestJS and TypeORM.

## Features

- User Authentication System
  - Registration, login with JWT tokens
  - Two-factor authentication
  - User profile management

- Investment Management
  - Multiple investment plans (Starter, Growth, Premium)
  - Automatic calculation of earnings based on investment amount and plan rate
  - Investment status tracking (active, completed, pending)

- Financial Operations
  - Cryptocurrency deposit/withdrawal processing (BTC, ETH, USDT)
  - Transaction history with filtering and pagination
  - Balance calculations

- Referral System
  - Unique referral links for each user
  - Tracking of referred users
  - Calculation of referral bonuses (5% of deposits)

- Admin Features
  - User management
  - Manual approval of deposits and withdrawals
  - Investment plan management

## Setup

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nestfield-backend.git
cd nestfield-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestfield

# JWT Configuration
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRATION=3600

# Application
PORT=3000
NODE_ENV=development
```

4. Start the application:
```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/profile` - Get current user profile (requires authentication)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user (admin only)

### Investment Plans

- `GET /api/investment-plans` - Get all active investment plans
- `GET /api/investment-plans/:id` - Get investment plan by ID
- `POST /api/investment-plans` - Create new investment plan (admin only)
- `PUT /api/investment-plans/:id` - Update investment plan (admin only)
- `DELETE /api/investment-plans/:id` - Delete investment plan (admin only)

### User Investments

- `POST /api/investments` - Create a new investment
- `GET /api/investments` - Get all investments for the current user
- `GET /api/investments/:id` - Get investment by ID
- `GET /api/investments/statistics` - Get investment statistics
- `PUT /api/investments/:id/activate` - Activate pending investment (admin only)
- `PUT /api/investments/:id/complete` - Complete active investment (admin only)

### Transactions

- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions` - Get all transactions for the current user
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/stats` - Get transaction statistics
- `PUT /api/transactions/:id/approve` - Approve pending transaction (admin only)
- `PUT /api/transactions/:id/reject` - Reject pending transaction (admin only)

### To Control Your Database

npx prisma init            # Create initial Prisma setup
npx prisma migrate dev     # Apply schema changes to DB
npx prisma generate        # Generate Prisma client
npx prisma studio          # Launch the visual data browser


## License

MIT #   n e s t f i e l d b a c k e n d 
 
 #   n e s t f i e l d b a c k e n d 
 
 
