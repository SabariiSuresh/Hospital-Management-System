import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../interface/appointment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentUrl = 'http://localhost:3000/appointment'

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentUrl}/`);
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.appointmentUrl}/${id}`);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.appointmentUrl}/add`, appointment);
  }

  updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.appointmentUrl}/${id}`, appointment);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.appointmentUrl}/${id}`);
  }

  getAppointmentsPerday() {
    return this.http.get<{ labels: string[], data: number[] }>(`${this.appointmentUrl}/status/per-day`)
  }

  getAppointmentCount() {
    return this.http.get<{count : number}>(`${this.appointmentUrl}/count`);
  }

}
