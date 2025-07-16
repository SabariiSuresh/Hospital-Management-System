import { Component } from '@angular/core';
import { Appointment } from '../../interface/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Patient } from '../../interface/patient';
import { Doctor } from '../../interface/doctor';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {

  appointment: Appointment | null = null;
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  errorMessage = '';

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    const appointmentId = this.route.snapshot.paramMap.get('id');

    if (appointmentId) {
      this.appointmentService.getAppointmentById(appointmentId).subscribe({
        next: (data) => this.appointment = data,
        error: () => this.errorMessage = 'Failed to load appointment'
      })
    }
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

  goBack() {
    this.location.back()
  }

}
