const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: 'Title and description are required' });
    }

    const task = new Task({
      title,
      description,
      status: status || 'Pending',
      userId: req.user.id,  // Make sure your auth middleware sets req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updates = {};

    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.status !== undefined) updates.status = req.body.status;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: 'Task not found or not authorized' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
};

// In your task controller deleteTask function
exports.deleteTask = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized: user ID missing' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid Task ID format' });
    }

    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: 'Task not found or unauthorized' });
    }

    res.status(200).json({ msg: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
};
