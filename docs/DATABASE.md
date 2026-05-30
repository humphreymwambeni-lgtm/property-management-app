# Database Schema

## Overview

The Property Management App uses PostgreSQL with Sequelize ORM. Below is the complete database schema.

---

## Users Table

Stores user account information for both property owners and customers.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'owner', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Unique user identifier
- `name` - User's full name
- `email` - User's email address (unique)
- `password` - Hashed password (bcrypt)
- `phone` - Contact phone number
- `role` - User role (customer, owner, or admin)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

---

## Properties Table

Stores all property listings created by owners.

```sql
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type ENUM(
    'House',
    'Apartment',
    'Lodge',
    'Hotel',
    'Commercial Space',
    'Office Space',
    'Warehouse'
  ) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  images JSON DEFAULT '[]',
  availability BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_location ON properties(location);
```

**Columns:**
- `id` - Unique property identifier
- `owner_id` - Reference to the property owner (users.id)
- `title` - Property name/title
- `description` - Detailed property description
- `property_type` - Type of property (House, Apartment, etc.)
- `price` - Nightly rental price
- `location` - Property location/address
- `images` - JSON array of image URLs
- `availability` - Boolean flag for availability
- `created_at` - Listing creation date
- `updated_at` - Last update date

---

## Bookings Table

Stores reservation information for properties.

```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status ENUM(
    'pending',
    'confirmed',
    'completed',
    'cancelled'
  ) DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

**Columns:**
- `id` - Unique booking identifier
- `property_id` - Reference to the property being booked
- `customer_id` - Reference to the customer making the booking
- `check_in` - Check-in date
- `check_out` - Check-out date
- `status` - Booking status (pending, confirmed, completed, cancelled)
- `total_price` - Total booking price (calculated as nights × price per night)
- `created_at` - Booking creation timestamp
- `updated_at` - Last update timestamp

---

## Relationships

```
Users (1) ----< (M) Properties
  └─ One user (owner) can have multiple properties

Users (1) ----< (M) Bookings
  └─ One user (customer) can have multiple bookings

Properties (1) ----< (M) Bookings
  └─ One property can have multiple bookings
```

---

## Database Constraints

1. **Foreign Keys:**
   - `properties.owner_id` → `users.id` (CASCADE DELETE)
   - `bookings.property_id` → `properties.id` (CASCADE DELETE)
   - `bookings.customer_id` → `users.id` (CASCADE DELETE)

2. **Unique Constraints:**
   - `users.email` - Ensures unique email addresses

3. **Indexes:**
   - Created on frequently queried columns for performance optimization

---

## Enums

### User Roles
- `customer` - Regular user who books properties
- `owner` - User who owns and lists properties
- `admin` - Administrator with full access

### Property Types
- `House`
- `Apartment`
- `Lodge`
- `Hotel`
- `Commercial Space`
- `Office Space`
- `Warehouse`

### Booking Status
- `pending` - Booking awaiting confirmation
- `confirmed` - Booking is confirmed
- `completed` - Stay is completed
- `cancelled` - Booking was cancelled

---

## Sample Data

### Sample User (Owner)
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "$2b$10$...",
  "phone": "+1 (555) 123-4567",
  "role": "owner",
  "created_at": "2026-05-30T10:00:00Z"
}
```

### Sample Property
```json
{
  "id": 1,
  "owner_id": 1,
  "title": "Beachfront Villa",
  "description": "Luxury villa with ocean views...",
  "property_type": "House",
  "price": "250.00",
  "location": "Miami, Florida",
  "images": ["https://..."],
  "availability": true,
  "created_at": "2026-05-30T10:30:00Z"
}
```

### Sample Booking
```json
{
  "id": 1,
  "property_id": 1,
  "customer_id": 2,
  "check_in": "2026-06-15",
  "check_out": "2026-06-20",
  "status": "confirmed",
  "total_price": "1250.00",
  "created_at": "2026-05-30T11:00:00Z"
}
```
