
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

router.get('/status/growth', patientController.patientsGrowth);
router.get('/count', patientController.patientCount);

router.get('/', patientController.getAllPatient);
router.get('/:id', patientController.getPatientsById);
router.post('/add', patientController.addPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;