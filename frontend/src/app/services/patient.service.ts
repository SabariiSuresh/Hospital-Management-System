import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../interface/patient';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientUrl = environment.apiUrl + '/patient';

  constructor( private http : HttpClient) { }

  getAllPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.patientUrl}/`);
  }

  getPatientById( id : string) : Observable<Patient>{
    return this.http.get<Patient>(`${this.patientUrl}/${id}`)
  } 

  addPatient( patient : Patient) : Observable<Patient>{
    return this.http.post<Patient>(`${this.patientUrl}/add` , patient)
  }

  updatePatient( id : string , patient : Patient) : Observable<Patient>{
    return this.http.put<Patient>(`${this.patientUrl}/${id}`, patient)
  }

  deletePatient( id : string ) : Observable<any>{
    return this.http.delete<any>(`${this.patientUrl}/${id}`)
  }

  getPatientGrowth(){
    return this.http.get<{ labels : string [], data : number[]}>(`${this.patientUrl}/status/growth`);
  }

   getPatientCount() {
    return this.http.get<{count : number}>(`${this.patientUrl}/count`);
  }

}
