import { Component } from '@angular/core';
import { BugReport } from 'src/app/models/BugReport';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  public bugReports: BugReport[] | undefined;

  constructor(
    public authService: AuthService,
    public alertService: AlertService,
    public bugReportService: BugReportService
  ) { 
    this.bugReportService.getBugReports().then((bugReports: BugReport[]) => {
      this.bugReports = bugReports;
    })
  }


}
