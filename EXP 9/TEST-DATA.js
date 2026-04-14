// MongoDB Test Data for Event Registration System
// Use this file to insert sample data for testing

// Method 1: Using mongosh (MongoDB Shell)
// =========================================

// Step 1: Open MongoDB Shell
// mongosh

// Step 2: Run these commands

use eventdb

db.registrations.insertMany([
  {
    "regno": "23CS101",
    "name": "Arun Kumar",
    "events": ["Coding Challenge", "Quiz Competition", "Web Design"],
    "registeredAt": new Date("2026-04-15T09:30:00Z")
  },
  {
    "regno": "23CS102",
    "name": "Priya Sharma",
    "events": ["Web Design", "Paper Presentation"],
    "registeredAt": new Date("2026-04-15T10:00:00Z")
  },
  {
    "regno": "23CS103",
    "name": "Rajesh Patel",
    "events": ["Debugging Contest", "Coding Challenge"],
    "registeredAt": new Date("2026-04-15T10:30:00Z")
  },
  {
    "regno": "23CS104",
    "name": "Neha Gupta",
    "events": ["Quiz Competition", "Paper Presentation", "Web Design"],
    "registeredAt": new Date("2026-04-15T11:00:00Z")
  },
  {
    "regno": "23CS105",
    "name": "Vikram Singh",
    "events": ["Coding Challenge"],
    "registeredAt": new Date("2026-04-15T11:30:00Z")
  },
  {
    "regno": "23CS106",
    "name": "Anjali Verma",
    "events": ["Debugging Contest", "Web Design", "Paper Presentation"],
    "registeredAt": new Date("2026-04-15T12:00:00Z")
  },
  {
    "regno": "23CS107",
    "name": "Arjun Nair",
    "events": ["Quiz Competition", "Debugging Contest"],
    "registeredAt": new Date("2026-04-15T12:30:00Z")
  },
  {
    "regno": "23CS108",
    "name": "Meera Chopra",
    "events": ["Web Design", "Quiz Competition"],
    "registeredAt": new Date("2026-04-15T13:00:00Z")
  }
])

// Verify data was inserted
db.registrations.find().pretty()

// Count documents
db.registrations.countDocuments()

// Step 3: Run web application tests
// npm start
// Then test with:
// - Registration form: http://localhost:3000
// - Admin search: http://localhost:3000/admin
// - Try searching for: 23CS101, 23CS102, etc.

// =========================================
// Additional Commands for Testing
// =========================================

// View all registrations
db.registrations.find({}).pretty()

// Find specific registration
db.registrations.findOne({ regno: "23CS101" })

// Find registrations for specific event
db.registrations.find({ events: "Coding Challenge" }).pretty()

// Count by event (aggregation)
db.registrations.aggregate([
  { $unwind: "$events" },
  { $group: { _id: "$events", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).pretty()

// View all indexes
db.registrations.getIndexes()

// Delete all documents (for fresh testing)
// db.registrations.deleteMany({})

// Drop collection (if needed)
// db.registrations.drop()

// =========================================
// Expected Test Results
// =========================================

// 1. Total Registrations: 8
// 2. Event Distribution:
//    - Coding Challenge: 3
//    - Web Design: 5
//    - Quiz Competition: 4
//    - Debugging Contest: 3
//    - Paper Presentation: 3

// 3. Register Numbers to test:
//    - 23CS101: Successful search
//    - 23CS105: Single event
//    - 23CS199: Not found

// 4. Duplicate Registration Test:
//    - Try registering with regno: 23CS101
//    - Should get error about duplicate

// =========================================
