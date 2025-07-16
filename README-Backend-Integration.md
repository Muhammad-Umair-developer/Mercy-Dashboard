# Backend Integration Guide - Dashboard Application

## Overview

This document provides comprehensive guidance for backend developers to integrate with the Dashboard Application. The frontend is built with React, TypeScript, and uses a simple authentication system that can be easily connected to your backend API.

## Table of Contents

1. [Authentication System](#authentication-system)
2. [API Endpoints Structure](#api-endpoints-structure)
3. [Data Models](#data-models)
4. [Frontend Integration Points](#frontend-integration-points)
5. [Environment Configuration](#environment-configuration)
6. [Security Considerations](#security-considerations)
7. [Development Setup](#development-setup)
8. [Testing](#testing)

## Authentication System

### Current Implementation

The frontend currently uses a simple localStorage-based authentication system. For production, this should be replaced with a proper JWT or session-based authentication.

### Backend Requirements

#### 1. Login Endpoint

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@admin.com",
  "password": "admin"
}
```

**Expected Response:**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "admin@admin.com",
    "role": "admin",
    "name": "Admin User"
  },
  "expiresIn": 3600
}
```

#### 2. Logout Endpoint

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 3. Token Validation Endpoint

```http
GET /api/auth/verify
Authorization: Bearer {token}
```

**Expected Response:**

```json
{
  "valid": true,
  "user": {
    "id": "user_id",
    "email": "admin@admin.com",
    "role": "admin"
  }
}
```

### Frontend AuthContext Integration

To integrate with your backend, modify the `src/context/AuthContext.tsx`:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
```

## API Endpoints Structure

### Base URL Configuration

Set your API base URL in a configuration file:

```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  TIMEOUT: 10000,
};
```

### Required Endpoints

#### Dashboard Data

```http
GET /api/dashboard/stats
Authorization: Bearer {token}
```

**Expected Response:**

```json
{
  "totalUsers": 1248,
  "totalOrders": 850,
  "completedOrders": 720,
  "totalRevenue": 45000,
  "monthlyGrowth": {
    "users": 12.5,
    "orders": 8.3,
    "revenue": 15.2
  }
}
```

#### Users Management

```http
GET /api/users?page=1&limit=10&search=""
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
```

#### Orders Management

```http
GET /api/orders?page=1&limit=10&status=""
GET /api/orders/:id
PUT /api/orders/:id/status
```

#### Transactions

```http
GET /api/transactions?page=1&limit=10&type=""
GET /api/transactions/:id
```

#### Analytics

```http
GET /api/analytics/charts
GET /api/analytics/reports?startDate=""&endDate=""
```

## Data Models

### User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "suspended";
  role: "admin" | "user" | "manager";
  dateRegistered: string;
  lastLogin?: string;
  profileImage?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  creditScore?: number;
  totalOrders: number;
  totalSpent: number;
}
```

### Order Model

```typescript
interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  amount: number;
  currency: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  deliveryAddress?: Address;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
```

### Transaction Model

```typescript
interface Transaction {
  id: string;
  userId: string;
  orderId?: string;
  type: "payment" | "refund" | "fee" | "bonus";
  status: "pending" | "completed" | "failed";
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  processedAt?: string;
  paymentMethod?: string;
}
```

## Frontend Integration Points

### API Service Layer

Create a service layer for API calls:

```typescript
// src/services/api.ts
import { API_CONFIG } from "../config/api";

class ApiService {
  private baseURL = API_CONFIG.BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("authToken");

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // User methods
  async getUsers(params?: UserQueryParams) {
    return this.request<UsersResponse>("/users", {
      method: "GET",
    });
  }

  async createUser(userData: CreateUserData) {
    return this.request<User>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // Add more methods as needed...
}

export const apiService = new ApiService();
```

### React Query Integration (Recommended)

For better data management, consider using React Query:

```bash
npm install @tanstack/react-query
```

```typescript
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";

export const useUsers = (params?: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => apiService.getUsers(params),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
```

## Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001

# Authentication
REACT_APP_JWT_SECRET=your_jwt_secret
REACT_APP_TOKEN_EXPIRY=3600

# Features
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_NOTIFICATIONS=true

# Development
REACT_APP_DEBUG=true
```

### Backend Environment Requirements

Your backend should support these environment variables:

```env
# Database
DATABASE_URL=your_database_url
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dashboard_db
DB_USER=postgres
DB_PASS=password

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=1h

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Security Considerations

### 1. CORS Configuration

Ensure your backend properly configures CORS:

```javascript
// Express.js example
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### 2. JWT Token Security

- Use secure, httpOnly cookies for production
- Implement token refresh mechanism
- Set appropriate expiration times
- Use strong JWT secrets

### 3. Input Validation

Implement proper validation on all endpoints:

```javascript
// Example with express-validator
const { body, validationResult } = require("express-validator");

app.post(
  "/api/users",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").trim().isLength({ min: 2, max: 50 }),
    body("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request...
  }
);
```

### 4. Rate Limiting

Implement rate limiting to prevent abuse:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

app.use("/api/", limiter);
```

## Development Setup

### 1. Database Schema

Recommended database tables:

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active',
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    profile_image TEXT,
    credit_score INTEGER,
    address JSONB
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_address JSONB
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    payment_method VARCHAR(50)
);
```

### 2. Backend Setup Example (Node.js/Express)

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/analytics", require("./routes/analytics"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Testing

### API Testing

Use tools like Postman or create automated tests:

```javascript
// Example test with Jest and Supertest
const request = require("supertest");
const app = require("../server");

describe("Authentication", () => {
  test("should login with valid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });
});
```

### Frontend Integration Testing

Test the integration between frontend and backend:

```typescript
// src/tests/integration.test.ts
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../pages/login/Login";

test("should login successfully", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "admin@admin.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "admin" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
```

## Deployment Considerations

### Production Configuration

1. Use environment-specific configuration files
2. Implement proper logging and monitoring
3. Use HTTPS for all communication
4. Implement proper error handling and user feedback
5. Set up health check endpoints
6. Use connection pooling for database connections
7. Implement caching strategies (Redis recommended)

### Performance Optimization

1. Implement pagination for large datasets
2. Use database indexing appropriately
3. Consider implementing GraphQL for complex queries
4. Use CDN for static assets
5. Implement response compression

## Support and Documentation

For questions or issues with the integration:

1. Check the existing GitHub issues
2. Review the API documentation
3. Contact the frontend development team
4. Create detailed bug reports with request/response examples

---

**Note:** This guide assumes a RESTful API design. If you're using GraphQL or other API patterns, adapt the examples accordingly.

**Version:** 1.0.0  
**Last Updated:** July 16, 2025
