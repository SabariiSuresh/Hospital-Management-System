import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  summary: any[] = [];
  errorMessage = '';

  appointmentsChart: any
  patientGrowthChart: any
  doctorSpecializations: any

  totalDoctors = 0;
  totalPatients = 0;
  totalAppointments = 0;

  constructor
    ( private appointmentService: AppointmentService,
      private patientService: PatientService,
      private doctorService: DoctorService ) { }

  ngOnInit(): void {
    this.loadAppointmentsChart();
    this.loadDoctorSpecializationChart();
    this.loadPatientGrowthChart();
    this.loadCounts();
  }

  loadCounts() {
    this.doctorService.getDoctorCount().subscribe(res => this.totalDoctors = res.count);
    this.patientService.getPatientCount().subscribe(res => this.totalPatients = res.count);
    this.appointmentService.getAppointmentCount().subscribe(res => this.totalAppointments = res.count);
  }

  loadAppointmentsChart() {
    this.appointmentService.getAppointmentsPerday().subscribe(res => {
      this.appointmentsChart = {
        series: [{ name: 'Appointments', data: res.data }],
        chart: { type: 'bar', height: 350 },
        title: { text: 'Appointments This Week' },
        xaxis: { categories: res.labels }
      };
    });
  }

  loadDoctorSpecializationChart() {
    this.doctorService.getSpecializationStatus().subscribe(res => {
      this.doctorSpecializations = {
        series: res.data,
        chart: { type: 'pie', height: 350 },
        labels: res.labels,
        title: { text: 'Doctor Specializations' },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: 'bottom' }
          }
        }],
        legend: { position: 'right' }
      };
    });
  }

  loadPatientGrowthChart() {
    this.patientService.getPatientGrowth().subscribe(res => {
      this.patientGrowthChart = {
        series: [{ name: 'New Patients', data: res.data }],
        chart: { type: 'line', height: 350 },
        title: { text: 'Patient Growth (Last 7 Days)' },
        xaxis: { categories: res.labels },
        dataLabels: { enabled: true }
      };
    });
  }

}
