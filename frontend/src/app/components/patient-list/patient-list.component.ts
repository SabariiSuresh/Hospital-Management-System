import { Component, OnInit } from '@angular/core';
import { Patient } from '../../interface/patient';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit{

  patient : Patient | null = null;
  errorMessage = ''

  constructor( private patientService : PatientService , private route : ActivatedRoute , private location : Location){}

  ngOnInit(): void {
    
    const patientId = this.route.snapshot.paramMap.get('id');

    if(patientId){
      this.patientService.getPatientById(patientId).subscribe({
        next : (data)=> this.patient = data,
        error : (err)=> {
          this.errorMessage = 'Failed to fetch patient'
          console.error("Error to fetch patient" , err)
        }
      })
    }
  }

goBack(){
  this.location.back();
}

}
