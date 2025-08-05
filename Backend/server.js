// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to dummy data file
const dbPath = path.join(__dirname, 'db.json');

// Helper function to read data from db.json
const readDb = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading db.json:', error);
        return { users: [] }; 
    }
};

// Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDb();
    const user = db.users.find(u => u.email === email && u.password === password);
    console.log(user)
    if (user) {
        // For security, do not send password back in a real application
        const { password, ...userData } = user;
        res.status(200).json({
            message: 'Login successful',
            user: userData ,
            token : 'some_token'
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get User Dashboard Data Route
// This route expects a username (or email) to fetch specific user data
app.get('/api/dashboard/:email', (req, res) => {
    const userEmail = req.params.email;
    const db = readDb();
    const user = db.users.find(u => u.email === userEmail);

    if (user) {
        // For security, do not send password back in a real application
        const { password, ...userData } = user;
        res.status(200).json({
            message: 'User data fetched successfully',
            user: userData
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
