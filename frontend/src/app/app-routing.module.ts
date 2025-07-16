import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path : 'dashboard' , component : DashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctors/:id', component: DoctorListComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'patients/:id', component: PatientListComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'appointments/:id', component: AppointmentListComponent },
  { path: '**' , component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
