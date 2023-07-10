const Subsidiaria = require('../models/subsidiaria');


exports.getSubsidiarias = (req, res, next) => {
  Subsidiaria.findAll()
    .then(subsidiarias => {
      res.status(200).json({ subsidiarias: subsidiarias });
    })
    .catch(err => console.log(err));
}

exports.getSubsidiaria = (req, res, next) => {
  const subsidiariaId = req.params.subsidiariaId;
  Subsidiaria.findByPk(subsidiariaId)
    .then(subsidiaria => {
      if (!subsidiaria) {
        return res.status(404).json({ message: 'Subsidiaria not found!' });
      }
      res.status(200).json({ subsidiaria: subsidiaria });
    })
    .catch(err => console.log(err));
}

exports.createSubsidiaria = (req, res, next) => {
  const razonSocial = req.body.razonSocial;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  const email = req.body.email;
  Subsidiaria.create({
    razonSocial: razonSocial,
    direccion: direccion,
    telefono: telefono,
    email: email
  })
    .then(result => {
      res.status(201).json({
        message: 'Subsidiaria created successfully!',
        subsidiaria: result
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.updateSubsidiaria = (req, res, next) => {
  const subsidiariaId = req.params.subsidiariaId;
  const updatedRazonSocial = req.body.razonSocial;
  const updatedDireccion = req.body.direccion;
  const updatedTelefono = req.body.telefono;
  const updatedEmail = req.body.email;

  Subsidiaria.findByPk(subsidiariaId)
    .then(subsidiaria => {
      if (!subsidiaria) {
        return res.status(404).json({ message: 'Subsidiaria not found!' });
      }
      subsidiaria.razonSocial = updatedRazonSocial;
      subsidiaria.direccion = updatedDireccion;
      subsidiaria.telefono = updatedTelefono;
      subsidiaria.email = updatedEmail;
      return subsidiaria.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Subsidiaria updated!', subsidiaria: result });
    })
    .catch(err => console.log(err));
}

exports.deleteSubsidiaria = (req, res, next) => {
  const subsidiariaId = req.params.subsidiariaId;
  Subsidiaria.findByPk(subsidiariaId)
    .then(subsidiaria => {
      if (!subsidiaria) {
        return res.status(404).json({ message: 'Subsidiaria not found!' });
      }
      return Subsidiaria.destroy({
        where: {
          id: subsidiariaId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Subsidiaria deleted!' });
    })
    .catch(err => console.log(err));
}