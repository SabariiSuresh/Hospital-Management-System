import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../interface/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-doctors',
  standalone: false,
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  displayColumns: string[] = ['name', 'specialization', 'availability', 'actions'];

  errorMessage = '';
  successMessage = '';
  message = '';

  paginatedData: Doctor[] = [];
  pageSize = 6;
  pageIndex = 0;

  newDoctor: Doctor = {
    name: '',
    specialization: '',
    availability: []
  }

  specializations: string[] = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Oncology',
    'Orthopedics',
    'General Medicine'
  ]

  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  isEditing: boolean = false;
  editingId: string | null = null;

  constructor(public doctorService: DoctorService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.updatedPage();
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch doctors';
        console.error("Failed to fetch doctors", err.message)
      }
    })
  }


  submitOn() {
    const updatedAvailability = typeof this.newDoctor.availability === 'string' ? this.newDoctor.availability.split(',').map(data => data.trim()) : this.newDoctor.availability;

    if (this.newDoctor.name && !this.newDoctor.name.startsWith('Dr. ')) {
      this.newDoctor.name = 'Dr. ' + this.newDoctor.name.trim();
    }

    if (this.isEditing && this.editingId) {

      const updatedDoctor = { ...this.newDoctor, availability: updatedAvailability }
      this.doctorService.updateDoctor(this.editingId, updatedDoctor).subscribe({
        next: () => {
          this.successMessage = 'Doctor updated successfully';
          this.loadDoctors();
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Failed to update doctor'
        }
      });
    } else {

      const newDoctor = { ...this.newDoctor, availability: updatedAvailability };
      this.doctorService.addDoctor(newDoctor).subscribe({
        next: () => {
          this.successMessage = 'Doctor added successfully';
          this.loadDoctors();
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Failed to add doctor';
        }
      });
    }
  }


  editDoctor(doctor: Doctor) {
    this.isEditing = true;
    this.editingId = doctor._id || null;
    this.newDoctor = {
      name: doctor.name,
      specialization: doctor.specialization,
      availability: doctor.availability

    }
  }

  resetForm() {
    this.newDoctor = { name: '', specialization: '', availability: [] };
    this.isEditing = false;
    this.editingId = null;
  }


  deleteDoctor(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure , You want to delete this doctor?' }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.doctorService.deleteDoctor(id).subscribe({
          next: () => {
            this.successMessage = 'Successfuly deleted doctor';
            this.loadDoctors();
          },
          error: (err) => {
            this.errorMessage = 'Failed to delete doctor';
            console.error("Error to delete doctor", err)
          }
        })
      }

    })
  };

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatedPage();

  }

  updatedPage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.doctors.slice(start, end)
  }

  goToDoctorList(id: string) {
    this.router.navigate(['/doctors', id])
  }

}
