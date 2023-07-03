import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  public images: string[] = [
    "https://wallpapercave.com/wp/wp2770248.jpg",
    "https://wallup.net/wp-content/uploads/2019/09/821112-dungeons-dragons-forgotten-realms-magic-rpg-action-adventure-puzzle-fantasy-warrior-dragon-1.jpg",
    "https://cdn.wallpapersafari.com/69/30/cOTieW.jpg",
    "https://wallpapercave.com/wp/wp4786826.png"
  ];

  public imageIndex: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated().then(() => {
      this.router.navigate(['/game'])
    })
  }

  public incrementImageIndex() {
    if (this.imageIndex == this.images.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
  }

  public decrementImageIndex() {
    if (this.imageIndex == 0) {
      this.imageIndex = this.images.length - 1;
    } else {
      this.imageIndex--;
    }
  }
}
