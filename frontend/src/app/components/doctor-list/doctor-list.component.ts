import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../interface/doctor';
import { DoctorService } from '../../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  doctor : Doctor | null = null;
  errorMessage = '';

  constructor(private doctorService: DoctorService, private route: ActivatedRoute , private location : Location) { }

  ngOnInit(): void {

    const doctorId = this.route.snapshot.paramMap.get('id');

    if (doctorId) {
      this.doctorService.getDoctor(doctorId).subscribe({
        next: (data) => this.doctor = data,
        error: () => this.errorMessage = 'Failed to load doctor'
      })
    }
  }

  goBack(){
      this.location.back()
    }

}
