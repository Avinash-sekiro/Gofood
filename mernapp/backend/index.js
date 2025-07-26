const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');

const app = express();
const port = 5000;

// ✅ Connect to MongoDB
mongoDB();

// ✅ CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('API is working');
});

// ✅ Import and use routes
const createUserRoutes = require('./Routes/CreateUser');
const displayDataRoutes = require('./Routes/DisplayData');
const orderDataRoutes = require('./Routes/OrderData'); // 🛠 FIX: Variable name corrected

app.use('/api', createUserRoutes);
app.use('/api', displayDataRoutes);
app.use('/api', orderDataRoutes); // ✅ Add this line to use order data route

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);

  // ✅ Optional: Log available routes
  if (app._router && app._router.stack) {
    app._router.stack.forEach(r => {
      if (r.route && r.route.path) {
        console.log(`Route: ${r.route.path} [${Object.keys(r.route.methods).join(', ').toUpperCase()}]`);
      }
    });
  }
});
