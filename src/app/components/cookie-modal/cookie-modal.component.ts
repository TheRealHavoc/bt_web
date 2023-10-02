import { Component } from '@angular/core';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.scss']
})
export class CookieModalComponent {
  constructor (
    public cookiesService: CookiesService
  ) {}
}
