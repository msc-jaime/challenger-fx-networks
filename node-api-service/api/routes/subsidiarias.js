const controller = require('../controllers/subsidiarias');
const router = require('express').Router();
const authenticate = require('../util/authenticate');

// CRUD Routes /subsidiarias
router.get('/', controller.getSubsidiarias); 
router.get('/:subsidiariaId', controller.getSubsidiaria); 
router.post('/', authenticate, controller.createSubsidiaria); 
router.put('/:subsidiariaId', authenticate, controller.updateSubsidiaria); 
router.delete('/:subsidiariaId', authenticate, controller.deleteSubsidiaria); 

module.exports = router;