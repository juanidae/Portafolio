// servicio.controller.js

const Servicio = require('../models/servicio');

const servicioCtrl = {};

// Obtener todos los servicios
servicioCtrl.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios', error });
  }
};

// Crear servicio
servicioCtrl.createServicio = async (req, res) => {
  try {
    const servicio = new Servicio(req.body);
    await servicio.save();
    res.json({ status: 'Servicio guardado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar servicio', error });
  }
};

// Obtener un servicio por ID
servicioCtrl.getUnicoServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicio', error });
  }
};

// Actualizar servicio
servicioCtrl.editarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioEdit = {
      // Ajusta estos campos según el esquema de Servicio
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      duracion: req.body.duracion
    };

    const servicioActualizado = await Servicio.findByIdAndUpdate(id, { $set: servicioEdit }, { new: true });
    if (!servicioActualizado) return res.status(404).json({ message: 'Servicio no encontrado para actualizar' });
    res.json({ status: 'Servicio Actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar servicio', error });
  }
};

// Eliminar servicio
servicioCtrl.eliminarServicio = async (req, res) => {
  try {
    const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicioEliminado) return res.status(404).json({ message: 'Servicio no encontrado para eliminar' });
    res.json({ status: 'Servicio Eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar servicio', error });
  }
};

module.exports = servicioCtrl;
