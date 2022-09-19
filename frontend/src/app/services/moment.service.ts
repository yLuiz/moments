import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMoment } from '../interfaces/Moment.entity';
import { IResponse } from '../interfaces/Response.entity';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private apiUrl = `${environment.apiUrl}/api/moments`;

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getMoment(id: number): Observable<IResponse<IMoment>> {
    return this.http.get<IResponse<IMoment>>(this.apiUrl + `/${id}`);
  }

  getAllMoment(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl);
  }

  updateMoment(momentId: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(this.apiUrl+`/${momentId}`, formData)
  }

  deleteMoment(momentId: number) {
    return this.http.delete(this.apiUrl+`/${momentId}`);
  }

}
