import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-plate-lobby',
  templateUrl: './player-plate-lobby.component.html',
  styleUrls: ['./player-plate-lobby.component.scss']
})
export class PlayerPlateLobbyComponent {
  @Input() username: string | undefined;
  @Input() isReady: boolean | undefined;
  @Input() isHost: boolean | undefined;

  public readyClasses() {
    if (this.isReady)
      return "outline outline-offset-2 outline-2 outline-green-400";

    return "";
  }
}
