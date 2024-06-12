const jwt = require('jsonwebtoken');

function ensureAuth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Assurez-vous que vous accédez à l'utilisateur correctement ici
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
}

module.exports = { ensureAuth };
