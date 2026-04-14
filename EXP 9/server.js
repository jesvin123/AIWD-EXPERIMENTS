const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB Connection Details
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'eventdb';
const COLLECTION_NAME = 'registrations';

let db;
let registrationsCollection;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db(DB_NAME);
    registrationsCollection = db.collection(COLLECTION_NAME);
    
    // Create unique index on register number to prevent duplicates
    await registrationsCollection.createIndex({ regno: 1 }, { unique: true });
    console.log('Database and collection initialized');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Routes

// Serve registration form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve admin search page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { regno, name, events } = req.body;

    // Validation: Check if register number is provided
    if (!regno || !regno.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Register Number is required'
      });
    }

    // Validation: Check if name is provided
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // Validation: Convert events to array if it's a string
    let selectedEvents = Array.isArray(events) ? events : (events ? [events] : []);

    // Validation: Check if at least one event is selected
    if (selectedEvents.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please select at least one event'
      });
    }

    // Validation: Check if maximum 3 events are selected
    if (selectedEvents.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'You can select a maximum of 3 events'
      });
    }

    // Create registration document
    const registration = {
      regno: regno.trim(),
      name: name.trim(),
      events: selectedEvents,
      registeredAt: new Date()
    };

    // Insert into MongoDB
    const result = await registrationsCollection.insertOne(registration);

    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: {
        regno: registration.regno,
        name: registration.name,
        events: registration.events
      }
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Register Number already exists. Please use a different Register Number.'
      });
    }

    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again.'
    });
  }
});

// Search endpoint
app.post('/search', async (req, res) => {
  try {
    const { regno } = req.body;

    // Validation: Check if register number is provided
    if (!regno || !regno.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a Register Number'
      });
    }

    // Search in MongoDB
    const registration = await registrationsCollection.findOne({
      regno: regno.trim()
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found for the provided Register Number'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Registration found',
      data: {
        regno: registration.regno,
        name: registration.name,
        events: registration.events
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during search. Please try again.'
    });
  }
});

// Get all registrations (for testing purposes)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await registrationsCollection.find({}).toArray();
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations'
    });
  }
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Registration form: http://localhost:${PORT}/`);
    console.log(`Admin search: http://localhost:${PORT}/admin`);
  });
}

startServer();
