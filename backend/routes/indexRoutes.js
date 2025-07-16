
const express = require('express');
const router = express.Router();

const doctorRoute = require('./doctor.route');
const patientRoute = require('./patient.routes');
const appointmentRoute = require('./appointment.route');

router.use('/doctor' , doctorRoute);
router.use('/patient' , patientRoute );
router.use('/appointment' , appointmentRoute );

module.exports = router;