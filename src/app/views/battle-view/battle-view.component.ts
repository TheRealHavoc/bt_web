import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Attack } from 'src/app/models/Attack';
import { Character } from 'src/app/models/Character';
import { Match } from 'src/app/models/Match';
import { PlayerData } from 'src/app/models/PlayerData';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { MatchService } from 'src/app/services/match.service';
import { Helpers } from 'src/app/utils/helpers';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.scss']
})
export class BattleViewComponent {
  @Input() match: Match | undefined;

  public convertAbilityScoreToAbilityScoreModifier = Helpers.convertAbilityScoreToAbilityScoreModifier;
  public convertAttackAttrStringToValue = Helpers.convertAttackAttrStringToValue;
  public convertModifierToString = Helpers.convertModifierToString;

  public generateAttackString = Helpers.generateAttackString;
  public generateDamageString = Helpers.generateDamageString;

  public timePlayed: string | undefined;

  public playerData: PlayerData | undefined;
  public enemyData: PlayerData | undefined;

  constructor(
    public matchService: MatchService,
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {
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

  public performAttack(attack: Attack) {
    if (!this.matchService.activeMatch) return;
    if (!this.playerData) return;

    this.matchService.performAttack(this.matchService.activeMatch.id, this.playerData.character.id, attack.name).then((match) => {
      
    }).catch((err) => {
      this.alertService.error("Something went wrong");
    });
  }
}
