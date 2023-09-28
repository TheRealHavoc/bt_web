import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Baldur\'s Trials';

  constructor (
    public loaderService: LoaderService
  ) {}
}
