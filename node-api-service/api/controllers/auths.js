const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Auth = require('../models/auth');
dotenv.config();

const findOneEmail = async (userEmail) => {
  return await Auth.findOne({ where: { email: userEmail } })
    .catch(err => console.log(err));
}

const createAuth = async (email, password) => {
  return Auth.create({
    email: email,
    password: await bcrypt.hash(password, 12)
  })
}

exports.postSignup = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email && !password) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const isExitsUserEmail = await findOneEmail(req.body.email);
    if (isExitsUserEmail) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    const user = await createAuth(email, password);

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
  try {
    const user = await findOneEmail(req.body.email);
    if (!user) {
      return res.status(400).json({ message: 'User Not Found!' })
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
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

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      user.nombre = updatedName;
      user.email = updatedEmail;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => console.log(err));
}

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  Auth.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
}

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  Auth.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ user: user });
    })
    .catch(err => console.log(err));
}

exports.getUsers = (req, res, next) => {
  Auth.findAll()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err => console.log(err));
}