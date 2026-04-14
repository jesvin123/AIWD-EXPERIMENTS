# Development Guide - Event Registration System

## Code Structure Explanation

### 1. server.js - Backend Server

#### Imports and Setup
```javascript
const express = require('express');           // Web framework
const { MongoClient } = require('mongodb');  // Database driver
const bodyParser = require('body-parser');   // Parse form data
const path = require('path');                // Handle file paths
```

#### MongoDB Connection
```javascript
async function connectDB() {
  // Connects to MongoDB at localhost:27017
  // Creates database 'eventdb' and collection 'registrations'
  // Creates unique index on 'regno' to prevent duplicates
}
```

#### Middleware
```javascript
app.use(bodyParser.urlencoded({ extended: true }));  // Parse form data
app.use(bodyParser.json());                           // Parse JSON
app.use(express.static(...));                         // Serve HTML/CSS/JS
```

#### Routes Explained

**Route 1: GET `/`**
- Serves the registration form (index.html)

**Route 2: POST `/register`**
- Receives form submission
- Validates: register number, name, event count (1-3)
- Inserts into MongoDB
- Returns success/error response

**Route 3: GET `/admin`**
- Serves the admin search form (admin.html)

**Route 4: POST `/search`**
- Receives search request
- Finds registration by register number
- Returns registration details or not found error

**Route 5: GET `/api/registrations`**
- Returns all registrations as JSON
- Used for testing and stats

---

## Frontend Code (HTML/JavaScript)

### Registration Form (public/index.html)

#### Event Count Validation
```javascript
// Updates displayed count and disables checkboxes after 3 selections
function updateEventCount() {
  const checkedCount = document.querySelectorAll(
    'input[name="events"]:checked'
  ).length;
  eventCount.textContent = checkedCount;
  
  // Disable remaining checkboxes if 3 selected
  eventCheckboxes.forEach(checkbox => {
    checkbox.disabled = checkedCount === 3 && !checkbox.checked;
  });
}
```

#### Form Submission
```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();  // Prevent page reload
  
  // Collect form data
  const regno = document.getElementById('regno').value.trim();
  const name = document.getElementById('name').value.trim();
  const selectedEvents = Array.from(
    document.querySelectorAll('input[name="events"]:checked')
  ).map(checkbox => checkbox.value);
  
  // Client-side validation
  // ... validation checks ...
  
  // Send to server
  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ regno, name, events: selectedEvents })
  });
  
  // Handle response
  const data = await response.json();
  if (response.ok) {
    showAlert(data.message, 'success');
    displaySuccessDetails(data.data);
    form.reset();
  } else {
    showAlert(data.message, 'danger');
  }
});
```

#### Alert System
```javascript
function showAlert(message, type) {
  alertMessage.textContent = message;
  alertMessage.className = `alert alert-${type} show`;
  
  // Auto-hide non-success alerts after 5 seconds
  if (type !== 'success') {
    setTimeout(() => {
      alertMessage.classList.remove('show');
    }, 5000);
  }
}
```

### Admin Search (public/admin.html)

#### Search Function
```javascript
async function searchRegistration() {
  const regno = searchInput.value.trim();
  
  if (!regno) {
    showAlert('Please enter a Register Number', 'danger');
    return;
  }
  
  // POST request to server
  const response = await fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ regno })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    displayResult(data.data);
  } else {
    showAlert(data.message, 'danger');
  }
}
```

#### Load Statistics
```javascript
async function loadStats() {
  // Fetch total registration count
  const response = await fetch('/api/registrations');
  const data = await response.json();
  
  document.getElementById('statsCount').textContent = data.count;
}
```

---

## Database Operations

### Create (Insert)
```javascript
const result = await registrationsCollection.insertOne({
  regno: "23CS101",
  name: "Arun Kumar",
  events: ["Coding Challenge", "Quiz Competition"],
  registeredAt: new Date()
});
```

### Read (Find)
```javascript
// Find one by register number
const registration = await registrationsCollection.findOne({
  regno: "23CS101"
});

// Find all
const all = await registrationsCollection.find({}).toArray();

// Find with filter
const eventUsers = await registrationsCollection.find({
  events: "Coding Challenge"
}).toArray();
```

### Update (Modify)
```javascript
await registrationsCollection.updateOne(
  { regno: "23CS101" },
  { $set: { name: "Updated Name" } }
);
```

### Delete (Remove)
```javascript
await registrationsCollection.deleteOne({
  regno: "23CS101"
});
```

---

## Validation Strategy

### Level 1: HTML5 Validation
```html
<input type="text" required>  <!-- Browser enforces required field -->
```

### Level 2: Client-Side JavaScript
```javascript
// Check in browser before sending to server
if (!regno || !regno.trim()) {
  showAlert('Register Number is required', 'danger');
  return;
}

if (selectedEvents.length > 3) {
  showAlert('Maximum 3 events allowed', 'danger');
  return;
}
```

### Level 3: Server-Side Validation
```javascript
// Server validates again for security
if (!regno || !regno.trim()) {
  return res.status(400).json({
    success: false,
    message: 'Register Number is required'
  });
}

if (selectedEvents.length > 3) {
  return res.status(400).json({
    success: false,
    message: 'You can select a maximum of 3 events'
  });
}
```

### Level 4: Database Constraints
```javascript
// Unique index prevents duplicate register numbers
await registrationsCollection.createIndex(
  { regno: 1 },
  { unique: true }
);

// If duplicate attempted, catches error:
if (error.code === 11000) {
  return res.status(409).json({
    success: false,
    message: 'Register Number already exists'
  });
}
```

---

## Error Handling

### Try-Catch Blocks
```javascript
try {
  // Risky operation
  const result = await registrationsCollection.insertOne(registration);
  res.status(201).json({ success: true, data: result });
} catch (error) {
  // Handle error
  if (error.code === 11000) {
    // Duplicate key error
    res.status(409).json({
      success: false,
      message: 'Register Number already exists'
    });
  } else {
    // General error
    res.status(500).json({
      success: false,
      message: 'An error occurred'
    });
  }
}
```

### HTTP Status Codes
- **200**: OK (request successful)
- **201**: Created (resource created)
- **400**: Bad Request (validation error)
- **404**: Not Found (no matching record)
- **409**: Conflict (duplicate)
- **500**: Internal Server Error

---

## Extending the Application

### Add New Fields to Registration

1. **Update HTML Form** (public/index.html)
```html
<input type="email" id="email" name="email" placeholder="Email">
```

2. **Update JavaScript** (public/index.html)
```javascript
const email = document.getElementById('email').value.trim();
// Include in fetch body
body: JSON.stringify({ regno, name, email, events })
```

3. **Update Server** (server.js)
```javascript
const { regno, name, email, events } = req.body;

// Validate email
if (!email || !email.includes('@')) {
  return res.status(400).json({
    success: false,
    message: 'Valid email is required'
  });
}

// Insert with email
const registration = {
  regno, name, email, events, registeredAt: new Date()
};
```

### Add More Events

1. **Add checkboxes in HTML**
```html
<input type="checkbox" id="eventX" name="events" value="New Event Name">
<label for="eventX">New Event Name</label>
```

2. No server changes needed - dynamically accepts any event names

### Add Event Date/Time

```javascript
// In registration form, add date input
<input type="datetime-local" id="eventDateTime" name="eventDateTime">

// In server, store timestamp
const registration = {
  ...
  eventDateTime: new Date(eventDateTime),
  registeredAt: new Date()
};
```

### Add Search by Name

```javascript
// In server.js, add new route
app.post('/search-by-name', async (req, res) => {
  const { name } = req.body;
  const results = await registrationsCollection
    .find({ name: { $regex: name, $options: 'i' } })
    .toArray();
  res.json({ success: true, data: results });
});
```

### Add Export to CSV

```javascript
// In server.js, add new route
app.get('/export-csv', async (req, res) => {
  const registrations = await registrationsCollection.find({}).toArray();
  
  let csv = 'Register Number,Name,Events\n';
  registrations.forEach(r => {
    csv += `${r.regno},"${r.name}","${r.events.join('; ')}"\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
  res.send(csv);
});
```

---

## Testing Your Code

### Test 1: Validation
```javascript
// Test server validation with curl
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"regno":"","name":"Test","events":["Event1"]}'

// Should return: "Register Number is required"
```

### Test 2: Duplicate Detection
```javascript
// Register same number twice
// Second should fail with duplicate error
```

### Test 3: Event Count Limit
```javascript
// Try to register 4 events
// Server should reject with error
```

### Test 4: Database Query
```javascript
// In MongoDB Shell
use eventdb
db.registrations.find({ "events": "Coding Challenge" }).pretty()
// Should show all with that event
```

---

## Performance Tips

### 1. Add Indexes for Better Queries
```javascript
// Index on events field for faster searching
db.registrations.createIndex({ events: 1 })

// Compound index
db.registrations.createIndex({ regno: 1, name: 1 })
```

### 2. Limit Query Results
```javascript
// Only fetch first 10
const registrations = await registrationsCollection
  .find({})
  .limit(10)
  .toArray();
```

### 3. Use Projection to Fetch Only Needed Fields
```javascript
// Only get regno and name, not events
const registrations = await registrationsCollection
  .find({}, { projection: { events: 0 } })
  .toArray();
```

### 4. Enable Caching
```javascript
// Cache all registrations in memory
let cachedRegistrations = null;
let cacheTime = null;

async function getRegistrations() {
  if (cacheTime && Date.now() - cacheTime < 60000) {
    return cachedRegistrations;  // Return cached (fresh < 1 min)
  }
  
  cachedRegistrations = await registrationsCollection.find({}).toArray();
  cacheTime = Date.now();
  return cachedRegistrations;
}
```

---

## Debugging Tips

### 1. Console Logging
```javascript
console.log('Registration data:', registration);
console.log('Error:', error);
```

### 2. Debugger
```javascript
// Insert in code to pause execution
debugger;

// Run with: node --inspect server.js
// Open: chrome://inspect
```

### 3. MongoDB Compass
- View data graphically
- Verify documents are saved
- Manual testing queries

### 4. Browser DevTools
- F12 to open
- Network tab: See requests/responses
- Console tab: See JavaScript errors

### 5. Network Requests in Code
```javascript
// Check what's being sent
console.log('Sending:', {regno, name, events});

// Check response
console.log('Response:', data);
```

---

## Common Mistakes to Avoid

❌ **Not trimming user input**
```javascript
// Bad
const regno = req.body.regno;

// Good
const regno = req.body.regno.trim();
```

❌ **No server-side validation**
```javascript
// Bad - Trusting client-side validation only

// Good
if (!regno || !regno.trim()) {
  return res.status(400).json({...});
}
```

❌ **Not handling async operations**
```javascript
// Bad
const result = registrationsCollection.insertOne(data);
console.log(result);  // Will be Promise, not data

// Good
const result = await registrationsCollection.insertOne(data);
console.log(result);  // Now has actual data
```

❌ **Exposing error details
```javascript
// Bad - Shows implementation details to user
return res.status(500).json({
  message: error.message,  // Exposes MongoDB errors
  stack: error.stack
});

// Good - Generic message
return res.status(500).json({
  message: 'An error occurred. Please try again.'
});
```

---

## Summary

- **Frontend**: HTML + JavaScript for user interaction
- **Backend**: Node.js + Express for API endpoints
- **Database**: MongoDB for document storage
- **Validation**: Multi-level (HTML, JS, Server, DB)
- **Error Handling**: Try-catch and proper HTTP status codes

Happy coding! 🚀
