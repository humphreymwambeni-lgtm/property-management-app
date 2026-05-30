# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Signup
**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1 (555) 000-0000",
  "role": "customer" // or "owner"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Login
**POST** `/auth/login`

Authenticate and get a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Get Current User
**GET** `/auth/me` ⚠️ *Protected*

Get the authenticated user's information.

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "role": "customer",
    "createdAt": "2026-05-30T12:00:00Z"
  }
}
```

---

## Property Endpoints

### Get All Properties
**GET** `/properties`

Get all properties with optional filters.

**Query Parameters:**
- `propertyType` (optional): Filter by property type (House, Apartment, Lodge, Hotel, etc.)
- `location` (optional): Filter by location (partial match)
- `minPrice` (optional): Minimum price per night
- `maxPrice` (optional): Maximum price per night
- `availability` (optional): true or false

**Example:**
```
GET /properties?propertyType=House&location=Miami&minPrice=50&maxPrice=500
```

**Response:**
```json
{
  "properties": [
    {
      "id": 1,
      "ownerId": 1,
      "title": "Luxury Beach House",
      "description": "Beautiful beachfront property...",
      "propertyType": "House",
      "price": "150.00",
      "location": "Miami, Florida",
      "images": [],
      "availability": true,
      "createdAt": "2026-05-30T12:00:00Z"
    }
  ]
}
```

### Get Property by ID
**GET** `/properties/:id`

Get a single property's details.

**Response:**
```json
{
  "property": {
    "id": 1,
    "ownerId": 1,
    "title": "Luxury Beach House",
    "description": "Beautiful beachfront property...",
    "propertyType": "House",
    "price": "150.00",
    "location": "Miami, Florida",
    "images": [],
    "availability": true,
    "createdAt": "2026-05-30T12:00:00Z"
  }
}
```

### Create Property
**POST** `/properties` ⚠️ *Protected (Owner only)*

Create a new property listing.

**Request Body:**
```json
{
  "title": "Luxury Beach House",
  "description": "Beautiful beachfront property with 3 bedrooms...",
  "propertyType": "House",
  "price": 150.00,
  "location": "Miami, Florida",
  "images": []
}
```

**Response:**
```json
{
  "message": "Property created successfully",
  "property": {
    "id": 1,
    "ownerId": 1,
    "title": "Luxury Beach House",
    "description": "Beautiful beachfront property with 3 bedrooms...",
    "propertyType": "House",
    "price": "150.00",
    "location": "Miami, Florida",
    "images": [],
    "availability": true,
    "createdAt": "2026-05-30T12:00:00Z"
  }
}
```

### Update Property
**PUT** `/properties/:id` ⚠️ *Protected*

Update an existing property (owner only).

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description...",
  "price": 200.00,
  "availability": false
}
```

**Response:**
```json
{
  "message": "Property updated successfully",
  "property": { ... }
}
```

### Delete Property
**DELETE** `/properties/:id` ⚠️ *Protected*

Delete a property (owner only).

**Response:**
```json
{
  "message": "Property deleted successfully"
}
```

---

## Booking Endpoints

### Create Booking
**POST** `/bookings` ⚠️ *Protected*

Create a new booking for a property.

**Request Body:**
```json
{
  "propertyId": 1,
  "checkIn": "2026-06-15",
  "checkOut": "2026-06-20"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": 1,
    "propertyId": 1,
    "customerId": 2,
    "checkIn": "2026-06-15T00:00:00Z",
    "checkOut": "2026-06-20T00:00:00Z",
    "status": "pending",
    "totalPrice": "750.00",
    "createdAt": "2026-05-30T12:00:00Z"
  }
}
```

### Get User Bookings
**GET** `/bookings` ⚠️ *Protected*

Get all bookings for the authenticated user.

**Query Parameters:**
- `status` (optional): Filter by status (pending, confirmed, completed, cancelled)

**Response:**
```json
{
  "bookings": [
    {
      "id": 1,
      "propertyId": 1,
      "customerId": 2,
      "checkIn": "2026-06-15T00:00:00Z",
      "checkOut": "2026-06-20T00:00:00Z",
      "status": "confirmed",
      "totalPrice": "750.00",
      "createdAt": "2026-05-30T12:00:00Z",
      "property": { ... }
    }
  ]
}
```

### Get Booking by ID
**GET** `/bookings/:id` ⚠️ *Protected*

Get details of a specific booking.

**Response:**
```json
{
  "booking": {
    "id": 1,
    "propertyId": 1,
    "customerId": 2,
    "checkIn": "2026-06-15T00:00:00Z",
    "checkOut": "2026-06-20T00:00:00Z",
    "status": "confirmed",
    "totalPrice": "750.00",
    "createdAt": "2026-05-30T12:00:00Z",
    "property": { ... }
  }
}
```

### Cancel Booking
**PUT** `/bookings/:id/cancel` ⚠️ *Protected*

Cancel a pending booking.

**Response:**
```json
{
  "message": "Booking cancelled successfully",
  "booking": {
    "id": 1,
    "status": "cancelled",
    ...
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-05-30T12:00:00Z"
}
```
