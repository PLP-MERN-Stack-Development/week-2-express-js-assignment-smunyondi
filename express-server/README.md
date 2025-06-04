# Express Server

This project is an Express.js application that serves as a product API. It allows users to perform CRUD operations on a sample in-memory products database.

## Project Structure

```
express-server
├── projectFiles
│   ├── server.js              # Entry point of the application
│   ├── routes
│   │   └── products.js        # Product routes
│   ├── middleware
│   │   ├── logger.js          # Logger middleware
│   │   ├── auth.js            # Authentication middleware
│   │   └── validation.js      # Validation middleware
│   ├── errors
│   │   └── customErrors.js    # Custom error classes
│   └── .env.example           # Example environment variables
├── .env                       # Server Environment
├── Products_API.postman_collection.json  # Postman collection for API testing
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Getting Started

To set up and run the server, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd express-server
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```
   This will install all required packages listed in `package.json`, including:
    - express
    - body-parser
    - dotenv
    - uuid

    Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

3. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in your values (e.g., `API_KEY`).

4. **Run the server**:
   ```sh
   npm start
   ```
   The server will start on `http://localhost:3000` (or your specified port).

## API Authentication

All API endpoints (except `/`) require an API key header:

- **Header:** `x-api-key`
- **Value:** The value of your `API_KEY` from your `.env` file

## API Documentation

All endpoints (except `/`) require the header:  
**Key:** `x-api-key`  
**Value:** (your API key from `.env`)

---

### **1. Welcome**
- **Method:** GET  
- **URL:** `/`  
- **Description:** Returns a welcome message.  
- **Headers:** _None required_

---

### **2. List all products**
- **Method:** GET  
- **URL:** `/api/products`  
- **Description:** Retrieve all products. Supports filtering, search, and pagination via query parameters.  
- **Headers:** `x-api-key: your_api_key`

---

### **3. Get a product by ID**
- **Method:** GET  
- **URL:** `/api/products/{id}`  
- **Description:** Retrieve a specific product by its unique ID.  
- **Headers:** `x-api-key: your_api_key`

---

### **4. Create a new product**
- **Method:** POST  
- **URL:** `/api/products`  
- **Description:** Add a new product.  
- **Headers:** `x-api-key: your_api_key`  
- **Body:** (raw, JSON)
  ```json
  {
    "name": "Tablet",
    "description": "10-inch display",
    "price": 300,
    "category": "electronics",
    "inStock": true
  }
  ```

---

### **5. Update a product**
- **Method:** PUT  
- **URL:** `/api/products/{id}`  
- **Description:** Update an existing product by its ID.  
- **Headers:** `x-api-key: your_api_key`  
- **Body:** (raw, JSON)
  ```json
  {
    "name": "Tablet Pro",
    "description": "12-inch display",
    "price": 400,
    "category": "electronics",
    "inStock": false
  }
  ```

---

### **6. Delete a product**
- **Method:** DELETE  
- **URL:** `/api/products/{id}`  
- **Description:** Delete a product by its ID.  
- **Headers:** `x-api-key: your_api_key`

---

### **7. Product statistics**
- **Method:** GET  
- **URL:** `/api/products/stats`  
- **Description:** Get product statistics by category.  
- **Headers:** `x-api-key: your_api_key`

---

**Note:**  
Replace `{id}` with the actual product ID.

---

## API Testing with Postman

You can use the included Postman collection file, **`Products_API.postman_collection.json`**, to quickly import all API requests into Postman for easy testing.  
- In Postman, click **Import**, select the file, and you’ll have all endpoints ready to use.
- Don’t forget to set the `x-api-key` header for all requests except `/`.

## Screenshots

The `screenshot` folder contains images showing the testing of the API endpoints using Postman.  
You can refer to these screenshots to see example requests and responses for each endpoint.

## License

This project is licensed under the MIT License.