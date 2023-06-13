import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-information-view',
  templateUrl: './account-information-view.component.html',
  styleUrls: ['./account-information-view.component.scss']
})
export class AccountInformationViewComponent {
  constructor(
    public authService: AuthService
  ) {

  }
}
