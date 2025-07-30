import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interface/patient';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients: Patient[] = [];

  newPatient: Patient = { name: '', age: 0, gender: '', contact: '', medicalHistory: '' };

  isEditing: boolean = false;
  editingId: string | null = null;

  errorMessage = '';
  successMessage = '';

  paginatedData: Patient[] = [];
  pageSize = 6;
  pageIndex = 0;

  displayColumns: string[] = ['name', 'age', 'gender', 'contact', 'medicalHistory', 'actions'];
  genderOption: string[] = ['Male', 'Female', 'Other'];

  constructor(private patientService: PatientService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.updatedPage();
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch patients'
        console.error('Error to fetch patients', err);
      }
    })
  }

  onSumbit() {
    if (this.isEditing && this.editingId) {
      this.patientService.updatePatient(this.editingId, this.newPatient).subscribe({
        next: () => {
          this.successMessage = 'Patient updated successfullt';
          this.loadPatients();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Failed to update doctor';
          console.error("Error to update patient", err);
        }
      })
    } else {
      this.patientService.addPatient(this.newPatient).subscribe({
        next: () => {
          this.successMessage = 'Patient added successfully';
          this.loadPatients();
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add patient';
          console.error("Error to add patient", err);
        }
      })
    }
  };

  editPatient(patient: Patient) {
    this.newPatient = { ...patient };
    this.isEditing = true;
    this.editingId = patient._id || null;
  }

  deletePatient(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure , you want to delete this patient?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(id).subscribe({
          next: () => {
            this.successMessage = 'Patient deleted successfully';
            this.loadPatients();
          },
          error: (err) => {
            this.errorMessage = 'Failed to delete patient';
            console.error("Error to delete patient", err);
          }
        })
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatedPage();

  }

  updatedPage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.patients.slice(start, end)
  }

  resetForm() {
    this.newPatient = { name: '', age: 0, gender: '', contact: '', medicalHistory: '' };
    this.isEditing = false;
    this.editingId = null;
  };

  goToPatientList(id: string) {
    this.router.navigate(['/patients', id])
  }

}
