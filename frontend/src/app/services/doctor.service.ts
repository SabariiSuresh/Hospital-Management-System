import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../interface/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorUrl = 'http://localhost:3000/doctor';

  constructor(private http: HttpClient) { }

  getAllDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.doctorUrl}/`);
  }

  getDoctor( id : string ) : Observable<Doctor> {
    return this.http.get<Doctor>(`${this.doctorUrl}/${id}`);
  }

  addDoctor( data : Doctor ) : Observable<Doctor> {
    return this.http.post<Doctor>(`${this.doctorUrl}/add` , data);
  }

  updateDoctor( id : string , data : Doctor ) : Observable<Doctor> {
    return this.http.put<Doctor>(`${this.doctorUrl}/${id}` , data );
  }

  deleteDoctor( id : string ) : Observable<any> {
    return this.http.delete<any>(`${this.doctorUrl}/${id}`);
  }

   getSpecializationStatus(){
    return this.http.get<{ labels : string [], data : number[]}>(`${this.doctorUrl}/status/specializaions`);
  }

   getDoctorCount() {
    return this.http.get<{count : number}>(`${this.doctorUrl}/count`);
  }

}
