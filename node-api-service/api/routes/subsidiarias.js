const controller = require('../controllers/subsidiarias');
const router = require('express').Router();

// CRUD Routes /subsidiarias
router.get('/', controller.getSubsidiarias); 
router.get('/:subsidiariaId', controller.getSubsidiaria); 
router.post('/', controller.createSubsidiaria); 
router.put('/:subsidiariaId', controller.updateSubsidiaria); 
router.delete('/:subsidiariaId', controller.deleteSubsidiaria); 

module.exports = router;