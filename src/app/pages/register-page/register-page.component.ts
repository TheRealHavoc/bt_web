import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  processingRequest: boolean = false;

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
      this.router.navigate(['/game'])
    })
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.processingRequest = true;

    if (this.form.get('password')?.value !== this.form.get('rePassword')?.value) {
      this.alertService.error(
        "Password error",
        "Passwords do not match."
      );

      return;
    }

    this.authService.register(this.form.value).then((res) => {
      this.alertService.success(
        "Account created",
        "A new account has been created."
      );

      this.router.navigate(['/login']);
    }).catch((error) => {
      this.alertService.error(
        "Something went wrong",
        "An error occured trying to process your request, try again later."
      );
    }).finally(() => {
      this.processingRequest = false;
    });
  }
}
