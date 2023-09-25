import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent {
  processingRequest: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.authService.isAuthenticated().then(() => {
      this.router.navigate(['/game'])
    })
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.processingRequest = true;

    this.authService.logIn(this.form.value).then((res) => {
      this.alertService.success(
        `Welcome ${res.username}`,
        "You are now logged in."
      );

      this.router.navigate(['/game']);
    }).catch((error) => {
      if (error.status === 0) {
        this.alertService.error("Something went wrong connecting to the server. Try again later.");
      } else {
        this.alertService.error(error.error);
      }
    }).finally(() => {
      this.processingRequest = false;
    });
  }
}
