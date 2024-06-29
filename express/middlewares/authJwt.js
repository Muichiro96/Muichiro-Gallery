const jwt = require('jsonwebtoken');
const conf = require('../config/auth.config');

function verifyToken(req, res, next) {
const token = req.headers["x-access-token"];
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, conf.secret);
 req.userId = decoded.user;

 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;