const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config(); 

const users = [{email: "admin", password: "admin"}];

exports.postSignup = async (req, res) => {
  try {
    if (!req.body.email && !req.body.password){
      return res.status(400).json({ message: 'Bad request' });
    }

    if (users.some(user => user.email === req.body.email)) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    const user = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
    }

    users.push(user);

    return res.status(201).json({
      status: 'success',
      message: 'User Registered!',
      data: {
        user: {
          email: user.email,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

exports.postSignin = async (req, res) => {
  console.log("postSignin");
  try {
    const user = users.find(user => user.email === req.body.email);
    if (!user) {
      return res.status(400).json({
        message: 'User Not Found!',
      });
    } else if (await bcrypt.compare(req.body.password, user.password)) {
      const tokenPayload = {
        email: user.email,
      };
      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      return res.status(201).json({
        status: 'success',
        message: 'User Logged In!',
        data: {
          accessToken,
        },
      });
    } else {
      return res.status(400).json({
        message: 'Wrong Password!',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}