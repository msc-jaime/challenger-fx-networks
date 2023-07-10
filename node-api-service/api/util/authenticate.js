const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config(); 

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
    return ;
  }
  
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};