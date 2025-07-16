
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.get('/status/specializaions', doctorController.getSpecializationstatus);
router.get('/count', doctorController.doctorCount);

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/add', doctorController.addDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;