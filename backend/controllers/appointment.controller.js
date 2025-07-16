
const Appointment = require('../models/appointment.model');

exports.getAllAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.find().populate('doctor', 'name specialization').populate('patient', 'name age gender');

        return res.status(200).json(appointments)

    } catch (err) {
        console.error("error", err.message)
        return res.status(500).json({ message: "Internal server error", error: err.message })

    }
}


exports.getAppointmentById = async (req, res) => {
    try {

        const appointment = await Appointment.findById(req.params.id).populate('doctor', 'name specialization').populate('patient', 'name age gender');

        if (!appointment) {

            return res.status(404).json({ message: "Appointment is not found" })

        } else {

            return res.status(200).json(appointment);

        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.addAppointment = async (req, res) => {
    try {

        const { patient, doctor, date, time, status } = req.body;

        const newAppointment = new Appointment({ patient, doctor, date, time, status: status || 'Scheduled' });

        await newAppointment.save();

        return res.status(200).json({ message: "Appointment created", appointment: newAppointment });

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message })

    }
}


exports.updateAppointment = async (req, res) => {
    try {

        const updateAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updateAppointment) {

            return res.status(404).json({ message: "Appointment not found" });

        } else {

            return res.status(200).json({ message: "Appointment updated", appointment: updateAppointment });
        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.deleteAppointment = async (req, res) => {
    try {

        const deleteAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deleteAppointment) {

            return res.status(404).json({ message: "Appointment not found" });

        } else {

            return res.status(200).json({ message: "Appointment deleted", appointment: deleteAppointment });
        }

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}


exports.appointmentsPerDay = async (req, res) => {
    try {

        const appointments = await Appointment.find();

        const countPerDay = [0, 0, 0, 0, 0, 0, 0];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'sun'];

        appointments.forEach((appt) => {
            const dayIndex = new Date(appt.date).getDay();
            const orderedIndex = [1, 2, 3, 4, 5, 6, 0][dayIndex];

            countPerDay[orderedIndex]++;

        });

        return res.status(200).json({ labels: days, data: countPerDay })

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}

exports.appointmentCount = async (req, res) => {
    try {

        const count = await Appointment.countDocuments();
        return res.status(200).json({ count });

    } catch (err) {

        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
}