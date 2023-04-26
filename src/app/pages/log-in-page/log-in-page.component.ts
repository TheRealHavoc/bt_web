import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
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
    private alertService: AlertService
  ) { }

  public onSubmit() {
    this.authService.logIn(this.form.value).subscribe({next: (res: User) => {
      this.alertService.success(`Welcome ${res.username}`);
    }, error: (res) => {
      this.alertService.error(res.error);
    }})
  }
}
