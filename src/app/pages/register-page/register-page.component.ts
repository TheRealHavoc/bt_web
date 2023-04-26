import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.authService.isAuthenticated().then(() => {
      this.router.navigate(['/menu'])
    });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    if (this.form.get('password') !== this.form.get('rePassword')) {
      this.alertService.warning("Passwords do not match.");

      return;
    }

    this.authService.register(this.form.value).then((res) => {
      this.alertService.success("Account created.");

      this.router.navigate(['/login']);
    }).catch((error) => {
      if (error.status === 0) {
        this.alertService.error("Something went wrong connecting to the server. Try again later.");
      } else {
        this.alertService.error(error.error);
      }
    });
  }
}
