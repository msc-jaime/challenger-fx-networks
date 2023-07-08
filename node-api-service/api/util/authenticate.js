const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config(); 

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  console.log(token);
  console.log(process.env.JWT_SECRET);

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