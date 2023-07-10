const controller = require('../controllers/empleados');
const router = require('express').Router();
const authenticate = require('../util/authenticate');

// CRUD Routes /empleados
router.get('/', controller.getEmpleados); 
router.get('/:empleadoId', controller.getEmpleado); 
router.post('/', authenticate, controller.createEmpleado);
router.put('/:empleadoId', authenticate, controller.updateEmpleado); 
router.delete('/:empleadoId', authenticate, controller.deleteEmpleado);

module.exports = router;