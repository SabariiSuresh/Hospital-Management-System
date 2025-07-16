
const Doctor = require('../models/doctor.model');

exports.getAllDoctors = async (req, res) => {
    try {

        const doctors = await Doctor.find();

        return res.status(200).json(doctors);

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

exports.getDoctorById = async (req, res) => {
    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {

            return res.status(404).json({ message: "Doctor not found" });

        } else {

            return res.status(200).json(doctor);
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


exports.addDoctor = async (req, res) => {
    try {

        const { name, specialization, availability } = req.body;

        const newDoctor = new Doctor({ name, specialization, availability });
        await newDoctor.save();

        return res.status(200).json({ message: "Doctor added", doctor: newDoctor })

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.updateDoctor = async (req, res) => {
    try {

        const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updateDoctor) {

            return res.status(404).json({ message: "Doctor not found" });

        } else {

            return res.status(200).json({ message: "Doctor updated", doctor: updateDoctor });

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.deleteDoctor = async (req, res) => {
    try {

        const deleteDoctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!deleteDoctor) {

            return res.status(404).json({ message: "Doctor not found" });

        } else {

            return res.status(200).json({ message: "Doctor deleted", doctor: deleteDoctor });

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.getSpecializationstatus = async (req, res) => {
    try {

        const doctors = await Doctor.find();

        const specializationCount = {};

        doctors.forEach(doc => {
            const spec = doc.specialization;

            if (spec) {
                specializationCount[spec] = (specializationCount[spec] || 0) + 1;
            }

        });

        const labels = Object.keys(specializationCount);
        const data = Object.values(specializationCount);

        return res.status(200).json({ labels, data })


    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.doctorCount = async (req, res) => {
    try {

        const count = await Doctor.countDocuments();
        return res.status(200).json({ count });

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}