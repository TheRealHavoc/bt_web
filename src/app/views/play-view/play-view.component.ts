import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/Match';
import { AlertService } from 'src/app/services/alert.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss']
})
export class PlayViewComponent {
  constructor(
    private matchService: MatchService,
    private alertService: AlertService,
    private router: Router
  ) {

  }

  public onCreateMatchClick() {
    this.matchService.createMatch().then((match: Match) => {
      this.alertService.success(
        "Match created",
        `A new match has been created with the id ${match.id}.`
      );
    })
  }
}
