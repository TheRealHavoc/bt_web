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
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  public onSubmit() {
    if (this.form.invalid) return;

    this.authService.logIn(this.form.value).then(res => {
      this.alertService.success(`Welcome ${res.username}`!);

      this.router.navigate(['']);
    }).catch(error => {
      this.alertService.error(error.error);
    });
  }
}
