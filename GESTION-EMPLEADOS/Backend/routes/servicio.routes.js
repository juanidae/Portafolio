const express = require('express'); // Importar express

const router = express.Router(); // Crear un router

const servicioCtrl = require('../controllers/servicio.controller'); // Importar el controlador de servicios

router.get('/', servicioCtrl.getServicios); // Obtener todos los servicios

router.post('/', servicioCtrl.createServicio); // Crear un nuevo servicio

router.get('/:id', servicioCtrl.getUnicoServicio); // Obtener un servicio por ID

router.put('/:id', servicioCtrl.editarServicio); // Actualizar un servicio por ID

router.delete('/:id', servicioCtrl.eliminarServicio); // Eliminar un servicio por ID


module.exports = router; // Exportar el router para usarlo en otros archivos