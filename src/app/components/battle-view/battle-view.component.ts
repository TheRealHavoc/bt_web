import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.scss']
})
export class BattleViewComponent {
  @Input() match: Match | undefined;

  public characters: Character[] | undefined;
  public timePlayed: string | undefined;

  constructor(
    public matchService: MatchService,
    public authService: AuthService,
    private alertService: AlertService,
    private characterService: CharacterService,
    private router: Router,
  ) {
    this.timePlayed = "-";

    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
    });

    this.setTimeSpend();
  }

  public setTimeSpend(): void {
    if (!this.matchService.activeMatch?.startedOn)
      return;

    var start = Date.parse(this.matchService.activeMatch.startedOn);

    this.timePlayed = this.getTimeSpend(start);

    setInterval(() => {
      this.timePlayed = this.getTimeSpend(start);
    }, 1000)
  }

  public getTimeSpend(start: number): string {
    let now = Date.now();

    let t = new Date(now - start);

    Math.abs(t.getTimezoneOffset() / 60);
    t.setHours(t.getHours() - Math.abs(t.getTimezoneOffset() / 60));

    let h = t.getHours().toString();
    if (h.length < 2) h = `0${h}`;

    let m = t.getMinutes().toString();
    if (m.length < 2) m = `0${m}`;

    let s = t.getSeconds().toString();
    if (s.length < 2) s = `0${s}`;

    return `${h}:${m}:${s}`;
  }

  public onEndMatchClick() {
    if (!this.matchService.activeMatch) return;

    this.matchService.endMatch(this.matchService.activeMatch.id).then((match) => {
      this.alertService.success("Match has ended.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }

  public onLeaveMatchClick() {
    if (!this.matchService.activeMatch) return;

    this.matchService.leaveMatch(this.matchService.activeMatch.id).then((match) => {
      this.alertService.success("You have left the match.");
      this.router.navigate(['/game']);
    }).catch((err) => {
      if (err.status === 401)
        this.alertService.error("You are not authorized to end the match.");
    });
  }
}
