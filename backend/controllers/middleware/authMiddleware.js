const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {

const token = req.cookies.jwtToken
console.log('hellosssssssss');
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY); // Verify token using your secret key

    req.user = decoded; // Attach the decoded token data (user info) to the request object
  

   req.session.user_Id = decoded.userId
   
   console.log( req.session.user_Id);

  
    next(); // Call next middleware or route handler
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
