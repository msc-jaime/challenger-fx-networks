const controller = require('../controllers/auths');
const router = require('express').Router();
const authenticate = require('../util/authenticate');

// CRUD Routes /auths
router.post('/signup/', controller.postSignup);
router.post('/signin/', controller.postSignin);
router.put('/update-user/:userId', authenticate, controller.updateUser);
router.delete('/delete-user/:userId', authenticate, controller.deleteUser);
router.get('/get-user/:userId', controller.getUser);
router.get('/get-users/', controller.getUsers);

module.exports = router;