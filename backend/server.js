const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const taskRoutes = require('./routes/taskroutes');
const authMiddleware = require('./middlewares/authMiddleware'); // to decode JWT

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // public routes
app.use('/api/tasks', authMiddleware, taskRoutes); // protected routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
