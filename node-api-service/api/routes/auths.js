const controller = require('../controllers/auths');
const router = require('express').Router();

// CRUD Routes /auth
router.post('/signup/', controller.postSignup);
router.post('/signin/', controller.postSignin);

module.exports = router;