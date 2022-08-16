import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FileControlService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/users/upload-images`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/image-paths`);
  }

//download files
downloadFiles(fileName:string):Observable<HttpEvent<Blob>>{
  return this.http.get(`${this.baseUrl}/file/download/${fileName}`,{
    reportProgress : true,
    observe : 'events',
    responseType : 'blob'
  })
}


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

    
}
