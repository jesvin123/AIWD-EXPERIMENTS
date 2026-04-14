# Event Registration System - Node.js + MongoDB

A complete web application for event registration using Node.js, Express, and MongoDB. This project demonstrates how to build a relational-like system with NoSQL database.

## Project Structure

```
event-registration-system/
├── public/
│   ├── index.html          # Registration form
│   └── admin.html          # Admin search page
├── server.js               # Express server and API endpoints
├── package.json            # Project dependencies
└── README.md              # This file
```

## Features

✅ **User Registration**
- Register Number validation
- Name field
- Select up to 3 events from 5 options
- Form validation (client and server-side)

✅ **Event Selection**
- Coding Challenge
- Debugging Contest
- Web Design
- Quiz Competition
- Paper Presentation
- Maximum 3 events constraint

✅ **MongoDB Integration**
- Document-based storage
- Unique constraint on Register Number (prevents duplicates)
- Automatic timestamp recording

✅ **Admin Search**
- Search registrations by Register Number
- View registration details
- Display total registration count

## Prerequisites

### 1. Node.js
- Download and install from [nodejs.org](https://nodejs.org)
- Verify installation: `node --version` and `npm --version`

### 2. MongoDB
- Download and install from [mongodb.com](https://www.mongodb.com/try/download/community)
- On Windows: MongoDB will run as a service by default
- Start MongoDB: 
  - If installed as service, it runs automatically
  - Or manually run: `mongod` from MongoDB bin directory

### 3. MongoDB Compass (Optional)
- Visual tool to view MongoDB databases
- Download from: https://www.mongodb.com/products/compass

## Installation Steps

### Step 1: Install Dependencies

```bash
cd "e:\AIWD\EXP 9"
npm install
```

This will install:
- `express` - Web framework
- `mongodb` - MongoDB driver
- `body-parser` - Parse form data
- `nodemon` - Auto-restart on file changes (dev only)

### Step 2: Verify MongoDB Connection

Ensure MongoDB is running:
```bash
# On Windows, MongoDB typically runs as a service
# You can verify by opening MongoDB Compass or checking Services
```

### Step 3: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

Expected output:
```
Connected to MongoDB
Database and collection initialized
Server running on http://localhost:3000
Registration form: http://localhost:3000/
Admin search: http://localhost:3000/admin
```

### Step 4: Access the Application

Open your browser and navigate to:
- **Registration Form**: http://localhost:3000/
- **Admin Search**: http://localhost:3000/admin
- **View all registrations (API)**: http://localhost:3000/api/registrations

## MongoDB Database Structure

### Database: `eventdb`
### Collection: `registrations`

### Document Schema

```json
{
  "_id": ObjectId("..."),
  "regno": "23CS101",
  "name": "Arun Kumar",
  "events": [
    "Coding Challenge",
    "Quiz Competition",
    "Web Design"
  ],
  "registeredAt": ISODate("2026-04-15T10:30:00.000Z")
}
```

### Database Indexes

- **Unique Index on `regno`**: Prevents duplicate registrations
  ```javascript
  db.registrations.createIndex({ regno: 1 }, { unique: true })
  ```

## API Endpoints

### 1. Registration Form
**GET** `/`
- Returns HTML registration form

### 2. Register User
**POST** `/register`

**Request Body:**
```json
{
  "regno": "23CS101",
  "name": "Arun Kumar",
  "events": ["Coding Challenge", "Quiz Competition", "Web Design"]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "regno": "23CS101",
    "name": "Arun Kumar",
    "events": ["Coding Challenge", "Quiz Competition", "Web Design"]
  }
}
```

**Error Response (400/409/500):**
```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

### 3. Admin Search Page
**GET** `/admin`
- Returns HTML admin search page

### 4. Search Registration
**POST** `/search`

**Request Body:**
```json
{
  "regno": "23CS101"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration found",
  "data": {
    "regno": "23CS101",
    "name": "Arun Kumar",
    "events": ["Coding Challenge", "Quiz Competition", "Web Design"]
  }
}
```

**Not Found Response (404):**
```json
{
  "success": false,
  "message": "Registration not found for the provided Register Number"
}
```

### 5. Get All Registrations
**GET** `/api/registrations`

**Success Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": ObjectId("..."),
      "regno": "23CS101",
      "name": "Arun Kumar",
      "events": [...]
    },
    ...
  ]
}
```

## Validation Rules

### Client-Side (HTML/JavaScript)
- All fields are required
- Register Number: Text input
- Name: Text input
- Events: Checkboxes with max 3 selection
- Visual feedback for event count

### Server-Side (Node.js)
- Register Number: Required, trimmed
- Name: Required, trimmed
- Events: Array with 1-3 items
- Unique constraint on Register Number
- Returns appropriate HTTP status codes

### Error Cases

1. **Missing Register Number (400)**
   ```
   "Register Number is required"
   ```

2. **Missing Name (400)**
   ```
   "Name is required"
   ```

3. **No Events Selected (400)**
   ```
   "Please select at least one event"
   ```

4. **More than 3 Events (400)**
   ```
   "You can select a maximum of 3 events"
   ```

5. **Duplicate Register Number (409)**
   ```
   "Register Number already exists. Please use a different Register Number."
   ```

## Testing Guide

### Test Case 1: Successful Registration
1. Go to http://localhost:3000/
2. Enter:
   - Register Number: `23CS101`
   - Name: `Arun Kumar`
   - Select: Coding Challenge, Quiz Competition, Web Design
3. Click Register
4. Should see success message with registration details

### Test Case 2: Duplicate Registration
1. Repeat Test Case 1
2. Try to register with same Register Number (23CS101)
3. Should see error: "Register Number already exists"

### Test Case 3: More than 3 Events
1. Try to select 4 checkboxes
2. 4th checkbox should be disabled after 3 are selected
3. If somehow 4 are submitted, server returns error

### Test Case 4: Search Existing Registration
1. Go to http://localhost:3000/admin
2. Enter: `23CS101`
3. Click Search
4. Should display all registration details

### Test Case 5: Search Non-Existing Registration
1. Go to http://localhost:3000/admin
2. Enter: `99CS999`
3. Click Search
4. Should see error: "Registration not found"

### Test Case 6: Empty Fields
1. Try to submit form without filling fields
2. Browser validation prevents submission
3. Or on mobile, server validates and returns error

### Test Case 7: View All Registrations
1. Open http://localhost:3000/api/registrations
2. Should display JSON array of all registrations with count

## Troubleshooting

### MongoDB Connection Error
**Problem**: "Failed to connect to MongoDB"

**Solution**:
- Ensure MongoDB service is running
- Check MongoDB is listening on `localhost:27017`
- On Windows: Check Services for MongoDB service

### Port 3000 Already in Use
**Problem**: "EADDRINUSE: address already in use :::3000"

**Solution**:
```bash
# Kill process on port 3000
# On Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or change port in server.js:
const PORT = 3001;  # Change to any available port
```

### Module Not Found Errors
**Problem**: "Cannot find module 'express'"

**Solution**:
```bash
npm install
```

### Form Data Not Submitting
**Problem**: Form submits but nothing happens

**Solution**:
- Check browser DevTools Console (F12) for errors
- Verify server is running
- Check network tab for response

### Checkbox Limit Not Working
**Problem**: Can select more than 3 events

**Solution**:
- This is enforced on server
- Refresh browser
- Check browser console for JavaScript errors

## MongoDB Management

### View Database with MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to:
   - Database: `eventdb`
   - Collection: `registrations`
4. View and manage documents

### Query Examples

```javascript
// Find all registrations
db.registrations.find({})

// Find by register number
db.registrations.findOne({ regno: "23CS101" })

// Count total registrations
db.registrations.countDocuments({})

// Find by event
db.registrations.find({ events: "Coding Challenge" })

// Delete a registration
db.registrations.deleteOne({ regno: "23CS101" })
```

## Comparison: MySQL vs MongoDB

### Data Storage Structure

**MySQL (Relational)**
```
Table: users
| id | regno    | name         |
|----|----------|--------------|
| 1  | 23CS101  | Arun Kumar   |

Table: registrations
| id | user_id | event                |
|----|---------|----------------------|
| 1  | 1       | Coding Challenge     |
| 2  | 1       | Quiz Competition     |
| 3  | 1       | Web Design           |
```

**MongoDB (Document)**
```
Collection: registrations
{
  "_id": ObjectId(...),
  "regno": "23CS101",
  "name": "Arun Kumar",
  "events": [
    "Coding Challenge",
    "Quiz Competition",
    "Web Design"
  ]
}
```

### Key Differences

| Aspect | MySQL | MongoDB |
|--------|-------|---------|
| **Schema** | Fixed, rigid | Flexible, dynamic |
| **Data Model** | Normalized tables | Documents |
| **Joins** | Required for related data | Embedded within document |
| **Setup** | More complex | Simpler, faster |
| **Scalability** | Vertical scaling | Horizontal scaling (sharding) |
| **Development Speed** | Slower (schema definition) | Faster (dynamic schema) |
| **Query Language** | SQL | MongoDB Query Language |
| **Transactions** | ACID compliant | ACID support (MongoDB 4.0+) |
| **Storage** | Row-oriented | Document-oriented |

### Advantages of MongoDB (NoSQL) for this Project

✅ **Faster Development**
- No schema migration needed
- Dynamic document structure
- Quick prototyping

✅ **Better Data Representation**
- Events naturally fit in an array
- No need for separate tables/joins
- More intuitive document structure

✅ **Schema Flexibility**
- Can add fields without altering schema
- Each document can have different fields
- Easy to evolve data model

✅ **Simpler Queries**
- Single document fetch = all information
- No SQL joins needed
- Cleaner application code

### Disadvantages of MongoDB for this Project

❌ **Duplicate Data**
- Same user info could be stored multiple times
- Data consistency harder to maintain

❌ **Storage Overhead**
- More storage per document
- Repeated field names in each document

❌ **Complex Reporting**
- Analytics across collections harder
- Limited aggregation framework vs SQL

## Files Delivered

1. **public/index.html**
   - Registration form with validation
   - Event selection checkboxes
   - Success/error message display
   - CSS styling

2. **public/admin.html**
   - Search interface
   - Results display
   - Registration statistics
   - CSS styling

3. **server.js**
   - Express server setup
   - MongoDB connection
   - API endpoints (/register, /search, /api/registrations)
   - Server-side validation
   - Error handling

4. **package.json**
   - Project metadata
   - Dependencies (express, mongodb, body-parser)
   - Dev dependencies (nodemon)
   - npm scripts

5. **README.md** (this file)
   - Complete documentation
   - Setup instructions
   - API reference
   - Testing guide
   - Troubleshooting
   - MySQL vs MongoDB comparison

## Screenshots Checklist

When submitting, include screenshots for:

- [ ] Registration form loaded in browser
- [ ] Successful registration with confirmation message
- [ ] Event count showing 3 selected events
- [ ] Duplicate registration error message
- [ ] Admin search page loaded
- [ ] Search results displayed correctly
- [ ] "Registration not found" error message
- [ ] MongoDB Compass showing the database and collection
- [ ] Network tab showing API request/response

## Running in Production

For production deployment:

1. **Set Environment Variables**
   ```bash
   set NODE_ENV=production
   set MONGO_URL=mongodb://your-production-server:27017
   set PORT=8000
   ```

2. **Use Process Manager**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "event-registration"
   ```

3. **MongoDB Security**
   - Enable authentication
   - Use connection string with credentials
   - Restrict network access

4. **HTTPS**
   - Use reverse proxy (nginx, Apache)
   - Get SSL certificate (Let's Encrypt)

## References

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [REST API Best Practices](https://restfulapi.net/)

## Author

Educational Exercise - Event Registration System

## License

ISC
