const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // Format: 'Bearer <token>'
  if (!token)
    return res.status(401).json({ success: false, message: 'Token missing or malformed' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user || decoded; // Assign user info to request
    next();
  } catch (err) {
    console.error('❌ JWT Error:', err.message);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
