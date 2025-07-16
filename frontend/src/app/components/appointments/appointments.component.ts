import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../interface/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../interface/patient';
import { Doctor } from '../../interface/doctor';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  paginatedData: Appointment[] = [];
  pageSize = 6;
  pageIndex = 0;

  newAppointment: Appointment = {
    patient: '',
    doctor: '',
    date: '',
    time: '',
    status: 'Scheduled'
  }

  times = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];


  errorMessage = '';
  successMessage = '';

  isEditing = false;
  editingId: string | null = null;

  constructor(private appointmentService: AppointmentService, private router: Router, private dialog: MatDialog, private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.updatedPage();
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch appointments';
        console.error("Error to fetch appointments", err)
      }
    });
  }


  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => {
        this.errorMessage = 'Failed to fetch patients'
        console.error('Error to fetch patients', err);
      }
    })
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch doctors';
        console.error("Failed to fetch doctors", err.message)
      }
    })
  }

  onSubmit() {
    if (this.isEditing && this.editingId) {
      this.appointmentService.updateAppointment(this.editingId, this.newAppointment).subscribe({
        next: () => {
          this.successMessage = 'Appointment updated!';
          this.loadAppointments();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update';
          console.error("Error to update", err);
        }
      })
    } else {
      this.appointmentService.addAppointment(this.newAppointment).subscribe({
        next: () => {
          this.successMessage = 'Appointment created';
          this.loadAppointments();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Failed to create appointment';
          console.error("Error to create appointment", err);
        }
      })
    }
  }

  editAppointment(appointment: Appointment) {
    this.editingId = appointment._id || null;
    this.isEditing = true;
    this.newAppointment = { ...appointment };
  }

  deleteAppointment(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { message: 'Are you sure , you want to delete this appointment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.deleteAppointment(id).subscribe({
          next: () => {
            this.successMessage = 'Appointment deleted successfully';
            this.loadAppointments();
          },
          error: (err) => {
            this.errorMessage = 'Failed to delete appointment';
            console.error("Error to delete appointment", err);
          }
        })
      }
    })

  }

  resetForm() {
    this, this.newAppointment = { patient: '', doctor: '', date: '', time: '', status: 'Scheduled' };
    this.isEditing = false;
    this.editingId = null;
  }

  getPatientDisplayName(patient: string | { name: string }): string {
    if (typeof patient === 'string') {
      const found = this.patients.find(p => p._id === patient);
      return found ? found.name : 'N/A';
    } else {
      return patient.name;
    }
  }

  getDoctorDisplayName(doctor: string | { name: string }): string {
    if (typeof doctor === 'string') {
      const found = this.doctors.find(d => d._id === doctor);
      return found ? found.name : 'N/A';
    } else {
      return doctor.name;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      case 'Scheduled':
      default:
        return 'status-scheduled';
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatedPage();

  }

  updatedPage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.appointments.slice(start, end)
  }

  goToAppointmentList(id: string) {
    this.router.navigate(['/appointments', id])
  }

}
