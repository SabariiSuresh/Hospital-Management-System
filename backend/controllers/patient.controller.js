
const Patient = require('../models/patient.model');


exports.getAllPatient = async (req, res) => {
    try {

        const patients = await Patient.find();

        return res.status(200).json(patients);

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.getPatientsById = async (req, res) => {
    try {

        const patient = await Patient.findById(req.params.id);

        if (!patient) {

            return res.status(404).json({ message: "Patient not found" })

        } else {

            return res.status(200).json(patient)

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.addPatient = async (req, res) => {
    try {

        const { name, age, gender, contact, medicalHistory } = req.body;
        const newPatient = new Patient({ name, age, gender, contact, medicalHistory });

        await newPatient.save();

        return res.status(200).json({ message: "New patient add", patient: newPatient });

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.updatePatient = async (req, res) => {
    try {

        const updatePatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatePatient) {

            return res.status(404).json({ message: "Patient not find" });

        } else {

            return res.status(200).json({ message: "Patient updated", patient: updatePatient });

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.deletePatient = async (req, res) => {
    try {

        const deletePatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletePatient) {

            return res.status(404).json({ message: "Patient not found" });

        } else {

            return res.status(200).json({ message: "Patient deleted", patient: deletePatient })

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.patientsGrowth = async (req, res) => {
    try {

        const today = new Date();

        const last7Days = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            last7Days.push(date.toISOString().slice(0, 10));
        }

        const patients = await Patient.find({
            createdAt: { $gte: new Date(last7Days[0] + 'T00:00:00Z') }
        });

        const growthData = last7Days.map(data => {
            const count = patients.filter(p =>
                p.createdAt.toISOString().startsWith(data)).length;
            return count
        });


        return res.status(200).json({ labels: last7Days, data: growthData })

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.patientCount = async (req, res) => {
    try {

        const count = await Patient.countDocuments();
        return res.status(200).json({ count });

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}