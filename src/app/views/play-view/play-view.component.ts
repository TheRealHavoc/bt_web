import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() newMatchEvent: EventEmitter<Match> = new EventEmitter<Match>();

  constructor(
    private matchService: MatchService,
    private alertService: AlertService,
  ) {

  }

  public onCreateMatchClick() {
    this.matchService.createMatch().then((match: Match) => {
      this.alertService.success(
        "Match created",
        `A new match has been created with the id ${match.id}.`
      );

      this.newMatchEvent.emit(match);
    }).catch((err) => {
      this.alertService.error(
        "Match error",
        `You already have a match running.`
      );
    })
  }

  public onQuickPlayClick() {
    this.matchService.joinRandomMatch().then((match: Match) => {
      this.alertService.success(
        "Match joined",
        `You have joined a match with the id ${match.id}.`
      );

      this.newMatchEvent.emit(match);
    }).catch((err) => {
      if (err.status == 404) {
        this.alertService.error(
          "No match found",
          `Could not find an open match.`
        );
      }
    })
  }
}
