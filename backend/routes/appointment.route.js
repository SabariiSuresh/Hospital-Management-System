
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');


router.get('/status/per-day', appointmentController.appointmentsPerDay);
router.get('/count', appointmentController.appointmentCount);

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/add', appointmentController.addAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;