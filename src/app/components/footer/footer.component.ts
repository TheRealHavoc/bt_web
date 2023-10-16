import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BugReport } from 'src/app/models/BugReport';
import { AlertService } from 'src/app/services/alert.service';
import { BugReportService } from 'src/app/services/bug-report.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public modalOpen: boolean = false;

  processingRequest: boolean = false;

  form: FormGroup = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(600)]),
  });

  public constructor(
    private bugReportService: BugReportService,
    private alertService: AlertService
  ) {}

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.processingRequest = true;

    this.bugReportService.addBugReport(this.form.value).then((bugReport: BugReport) => {
      this.alertService.success(
        "Bug report",
        "Thank you for your bug report, we will get on it as soon as possible!"
      );

      this.form.reset();
      this.modalOpen = false;
    }).catch((err) => {
      this.alertService.error(
        "Something went wrong",
        "An error occured trying to process your request, try again later."
      );
    });

    this.processingRequest = false;
  }
}
