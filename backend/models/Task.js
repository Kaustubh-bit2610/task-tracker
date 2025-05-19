const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Todo', 'In Progress', 'Completed'], // ✅ Added "Todo"
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', TaskSchema);
