import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces/Comment.entity';
import { IResponse } from '../interfaces/Response.entity';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiUrl}/api/moments`;

  constructor(private http: HttpClient) { }

  createComment(comment: IComment): Observable<IResponse<IComment>> {
    const url = `${this.apiUrl}/${comment.momentId}/comments`;
    return this.http.post<IResponse<IComment>>(url, comment)
  }

}
