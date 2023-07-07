const Empleado = require('../models/empleado');


exports.getEmpleados = (req, res, next) => {
  Empleado.findAll()
    .then(empleados => {
      res.status(200).json({ empleados: empleados });
    })
    .catch(err => console.log(err));
}

exports.getEmpleado = (req, res, next) => {
  const empleadoId = req.params.empleadoId;
  Empleado.findByPk(empleadoId)
    .then(empleado => {
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado not found!' });
      }
      res.status(200).json({ empleado: empleado });
    })
    .catch(err => console.log(err));
}

exports.createEmpleado = (req, res, next) => {
  const nombre = req.body.nombre;
  const cedula = req.body.cedula;
  const fechaContratacion = req.body.fechaContratacion;
  const puesto = req.body.puesto;
  const oficina = req.body.oficina;
  Empleado.create({
    nombre: nombre,
    cedula: cedula,
    fechaContratacion: fechaContratacion,
    puesto: puesto,
    oficina: oficina,
  })
    .then(result => {
      console.log('Created Empleado');
      res.status(201).json({
        message: 'Empleado created successfully!',
        empleados: result
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.updateEmpleado = (req, res, next) => {
  const empleadoId = req.params.empleadoId;
  const updatedNombre = req.body.nombre;
  const updatedCedula = req.body.cedula;
  const updatedFechaContratacion = req.body.fechaContratacion;
  const updatedPuesto = req.body.puesto;
  const updatedOficina = req.body.oficina;
  Empleado.findByPk(empleadoId)
    .then(empleado => {
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado not found!' });
      }
      empleado.nombre = updatedNombre;
      empleado.cedula = updatedCedula;
      empleado.fechaContratacion = updatedFechaContratacion;
      empleado.puesto = updatedPuesto;
      empleado.oficina = updatedOficina;
      return empleado.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Empleado updated!', empleado: result });
    })
    .catch(err => console.log(err));
}

exports.deleteEmpleado = (req, res, next) => {
  const empleadoId = req.params.empleadoId;
  Empleado.findByPk(empleadoId)
    .then(empleado => {
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado not found!' });
      }
      return Empleado.destroy({
        where: {
          id: empleadoId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Empleado deleted!' });
    })
    .catch(err => console.log(err));
}