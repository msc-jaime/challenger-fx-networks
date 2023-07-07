const controller = require('../controllers/empleados');
const router = require('express').Router();

// CRUD Routes /empleados
router.get('/', controller.getEmpleados); 
router.get('/:empleadoId', controller.getEmpleado); 
router.post('/', controller.createEmpleado);
router.put('/:empleadoId', controller.updateEmpleado); 
router.delete('/:empleadoId', controller.deleteEmpleado);

module.exports = router;