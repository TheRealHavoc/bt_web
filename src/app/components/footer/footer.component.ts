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
  public sum: number[] = [];

  processingRequest: boolean = false;

  form: FormGroup = new FormGroup({
    subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(600)]),
    sumGame: new FormControl('', [Validators.required]),
  });

  public constructor(
    private bugReportService: BugReportService,
    private alertService: AlertService
  ) {
    this.sum[0] = Math.floor(Math.random() * 10) + 1;
    this.sum[1] = Math.floor(Math.random() * 10) + 1;
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    if (this.form.get('sumGame')?.value !== (this.sum[0] + this.sum[1])) {
      this.alertService.error(
        "Error",
        "You are a robot! :("
      );

      return;
    }
    
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