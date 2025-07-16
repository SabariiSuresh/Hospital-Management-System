
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
        name: String,
        age: String,
        gender: String,
        contact: Number,
        medicalHistory: String

    },
    { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema)