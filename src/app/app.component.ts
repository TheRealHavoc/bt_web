import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppContent } from './models/app-content';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Baldur\'s Trials';

  public appContent?: AppContent;

  constructor(private http: HttpClient) {
    this.http.get<AppContent>(`${environment.apiUrl}appcontent`).subscribe((res: AppContent) => {
      this.appContent = res;
    })
  }
}
