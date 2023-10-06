import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BugReport } from '../models/BugReport';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BugReportService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.user?.token}`
    })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public addBugReport(bugReport: BugReport): Promise<BugReport> {
    return new Promise<BugReport>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}BugReport`, bugReport, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as BugReport);
      }, error: (error) => {
        reject(error);
      }})
    })
  }
}
