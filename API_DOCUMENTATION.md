# Penghitung Sembako API Documentation

This is a API documentation for Penghitung Sembako mobile application project.

## Base URL

- Local development: `http://localhost:3000`
- The app also serves a documentation page at `GET /` and a health/status page at `GET /test`

## Common Response Format

Most endpoints return JSON in the following shape:

```json
{
  "status": 200,
  "message": "Optional success or error message",
  "data": {}
}
```

Some endpoints return resource-specific fields such as `user`, `store`, `groceries`, `transaction`, or `statistics`.

## Data Models

### User

```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com",
  "password": "optional-hashed-or-plain-text-password",
  "profileUrl": "https://example.com/avatar.png"
}
```

### Store

```json
{
  "id": 1,
  "userId": 1,
  "name": "Toko Sembako Kita",
  "address": "Jl. Merdeka No. 1",
  "phone": "081234567890",
  "email": "store@example.com"
}
```

### Grocery

```json
{
  "id": 1,
  "storeId": 1,
  "name": "Beras",
  "unit": "kg",
  "price": 12000,
  "imageUrl": "https://example.com/images/beras.jpg"
}
```

### Stock

```json
{
  "groceryId": 1,
  "storeId": 1,
  "quantity": 50
}
```

### Transaction

```json
{
  "id": 1,
  "storeId": 1,
  "groceryId": 1,
  "amount": 5,
  "totalPrice": 60000
}
```

---

## Endpoints

### 1) Root & Health

#### `GET /`
Returns the HTML documentation page.

#### `GET /test`
Returns a health/status page. If the request accepts JSON, it returns a JSON response instead.

Example JSON response:

```json
{
  "status": "healthy",
  "timestamp": "2026-09-14T10:00:00.000Z",
  "uptime": "1h5m",
  "services": {
    "server": { "status": "UP" },
    "database": { "status": "UP", "latencyMs": 10 },
    "storage": { "status": "UP", "bucket": "groceries" }
  }
}
```

---

### 2) User

#### `GET /user/:id`
Get a user by ID, including associated stores.

Path parameter:
- `id` (number/string): user ID

Example response:

```json
{
  "status": 200,
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "profileUrl": null,
    "Stores": []
  }
}
```

#### `POST /user/login`
Login with email and password.

Request body:

```json
{
  "email": "john@example.com",
  "password": "your-password"
}
```

Response:

```json
{
  "status": 200,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "profileUrl": "https://example.com/avatar.png",
    "Stores": []
  }
}
```

> Note: If the email or password is invalid, the API returns `401`.

#### `POST /user`
Create a user.

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "optional-password",
  "profileUrl": "https://example.com/avatar.png"
}
```

Response:

```json
{
  "status": 201,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "profileUrl": "https://example.com/avatar.png"
  }
}
```

> Note: If a user with the same email already exists, the API returns `200` with a message instead of creating a duplicate entry.

---

### 3) Grocery

#### `GET /grocery/:storeId`
Get all groceries for a specific store.

Path parameter:
- `storeId` (number): store ID

Example response:

```json
{
  "status": 200,
  "groceries": [
    {
      "id": 1,
      "storeId": 1,
      "name": "Beras",
      "unit": "kg",
      "price": 12000,
      "imageUrl": "https://example.com/images/beras.jpg",
      "stock": {
        "quantity": 50
      }
    }
  ]
}
```

#### `GET /grocery/details/:id`
Get one grocery by ID.

Path parameter:
- `id` (number): grocery ID

#### `POST /grocery`
Create a grocery.

Request body:

```json
{
  "storeId": 1,
  "name": "Beras",
  "unit": "kg",
  "price": 12000,
  "quantity": 50,
  "imageUrl": "https://example.com/images/beras.jpg"
}
```

Validation notes:
- `imageUrl` or `image_url` is accepted.
- If no image URL is provided, the controller is prepared to support file upload, but the route currently does not attach a file-upload middleware.

Response:

```json
{
  "status": 201,
  "message": "Grocery created successfully",
  "grocery": {
    "id": 1,
    "storeId": 1,
    "name": "Beras",
    "unit": "kg",
    "price": 12000,
    "imageUrl": "https://example.com/images/beras.jpg",
    "stock": {
      "quantity": 50
    }
  }
}
```

#### `PUT /grocery/:id`
Update grocery data by ID.

Path parameter:
- `id` (number): grocery ID

Request body example:

```json
{
  "name": "Beras Premium",
  "price": 15000,
  "imageUrl": "https://example.com/images/beras-premium.jpg"
}
```

#### `DELETE /grocery/:id`
Delete a grocery by ID.

#### `PUT /grocery/:id/stock`
Update stock quantity for a grocery.

Path parameter:
- `id` (number): grocery ID

Request body:

```json
{
  "quantity": 75
}
```

Response:

```json
{
  "status": 200,
  "message": "Stock updated successfully",
  "grocery": {
    "id": 1,
    "storeId": 1,
    "name": "Beras",
    "stock": {
      "quantity": 75
    }
  }
}
```

---

### 4) Store

#### `GET /store/:userId`
Get all stores belonging to a user.

Path parameter:
- `userId` (number): user ID

Example response:

```json
{
  "status": 200,
  "store": [
    {
      "id": 1,
      "userId": 1,
      "name": "Toko Sembako Kita",
      "address": "Jl. Merdeka No. 1",
      "phone": "081234567890",
      "email": "store@example.com"
    }
  ]
}
```

#### `GET /store/details/:id`
Current implementation returns the store data associated with the provided `userId` value, not a strictly detailed store lookup by store ID.

#### `POST /store`
Create a store.

Request body:

```json
{
  "userId": 1,
  "name": "Toko Sembako Kita",
  "address": "Jl. Merdeka No. 1",
  "phone": "081234567890",
  "email": "store@example.com"
}
```

#### `PUT /store/:id`
Update store details.

Request body example:

```json
{
  "name": "Toko Sembako Baru",
  "address": "Jl. Sudirman No. 10",
  "phone": "081234567891",
  "email": "newstore@example.com"
}
```

#### `DELETE /store/:id`
Delete a store and all related data (transactions, stocks, groceries) before deleting the store itself.

---

### 5) Transaction

#### `GET /transaction/:storeId`
Get all transactions for a store.

Path parameter:
- `storeId` (number): store ID

Example response:

```json
{
  "status": 200,
  "transactions": [
    {
      "id": 1,
      "storeId": 1,
      "groceryId": 1,
      "amount": 5,
      "totalPrice": 60000,
      "Grocery": {
        "id": 1,
        "name": "Beras"
      }
    }
  ]
}
```

#### `GET /transaction/details/:id`
Get one transaction by ID.

#### `POST /transaction`
Create a transaction.

Request body:

```json
{
  "storeId": 1,
  "groceryId": 1,
  "amount": 5,
  "totalPrice": 60000
}
```

Notes:
- The controller accepts either `amount` or `quantity` in the request body.
- Creating a transaction also updates the stock quantity for the related grocery.

#### `PUT /transaction/:id`
Update a transaction.

Request body example:

```json
{
  "amount": 3,
  "totalPrice": 36000
}
```

#### `DELETE /transaction/:id`
Delete a transaction and restore the stock quantity for the related grocery.

---

### 6) Statistics

#### `GET /stats/:userId`
Get aggregate statistics for a user.

Path parameter:
- `userId` (number): user ID

Example response:

```json
{
  "status": 200,
  "message": "Grocery count retrieved successfully",
  "statistics": {
    "groceryCount": 20,
    "totalSales": 250000,
    "totalHistory": 15
  }
}
```

---

### 7) Upload

#### `POST /upload/presigned-url`
Generate a presigned upload URL for MinIO/S3-compatible storage.

Request body:

```json
{
  "fileName": "beras.jpg",
  "contentType": "image/jpeg",
  "objectName": "images/beras.jpg"
}
```

Response:

```json
{
  "status": 200,
  "message": "Presigned upload URL generated successfully",
  "uploadUrl": "https://...",
  "objectName": "images/beras.jpg",
  "publicUrl": "https://.../images/beras.jpg"
}
```

> The API requires either `fileName` or `objectName` in the request body.

---

## Error Responses

Common error payloads look like this:

```json
{
  "status": 400,
  "message": "Descriptive validation message"
}
```

or

```json
{
  "status": 500,
  "message": "Internal server error",
  "error": "Detailed error message"
}
```

Typical HTTP status codes used by the API:
- `200` OK
- `201` Created
- `400` Bad Request
- `404` Not Found
- `500` Internal Server Error

---

## Notes

- The base app is configured to run on port `3000` by default from the `.env` file.
- The project includes a docs HTML page served from `/` and a health dashboard at `/test`.
- Some endpoints currently have implementation details that are slightly inconsistent with their paths (for example, `GET /store/details/:id` is implemented using the `userId` field). This documentation reflects the current behavior of the code.
