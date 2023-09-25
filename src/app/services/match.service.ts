import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../models/Match';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { PlayerData } from '../models/PlayerData';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private interval: any;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.user?.token}`
    })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getMatchByID(matchID: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}Match/GetMatchByID?matchID=${matchID}`, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public createMatch(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/CreateMatch`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public joinMatch(matchId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/JoinMatch/?matchId=${matchId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public joinRandomMatch(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/JoinRandomMatch`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public startMatch(matchId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/StartMatch/?matchId=${matchId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public getMatchByAuth(): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}Match/GetOpenMatchByAuthenticated`, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public endMatch(matchId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/EndMatch/?matchId=${matchId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public leaveMatch(matchId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/LeaveMatch/?matchId=${matchId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public toggleReady(matchId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/ToggleReady/?matchId=${matchId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res as Match);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public setCharacter(matchId: string, characterId: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/SetCharacter/?matchId=${matchId}&characterId=${characterId}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  public performAttack(matchId: string, characterId: string, attackName: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}Match/PerformAttack/?matchId=${matchId}&characterId=${characterId}&attackName=${attackName}`, {}, this.httpOptions).subscribe({next: (res: any) => {
        resolve(res);
      }, error: (error) => {
        reject(error);
      }})
    })
  }

  // Utilities

  public getUserPlayerData(playerData: PlayerData[]): PlayerData | null {
    let res = playerData.find(x => x.user.username === this.authService.user?.username);

    if (res === undefined) return null;

    return res;
  }

  public isHost(match: Match): boolean {
    if (!match) return false;

    let playerData = this.getUserPlayerData(match.playerData);

    if (playerData === null) return false;

    return playerData.isHost;
  }

  public isReady(match: Match): boolean {
    if (!match) return false;

    let playerData = this.getUserPlayerData(match.playerData);

    if (playerData === null) return false;

    return playerData.isReady;
  }

  public canReady(match: Match): boolean {
    if (!match) return false;

    let playerData = this.getUserPlayerData(match.playerData);

    if (playerData === null) return false;

    if (playerData.character === null) return false;

    return true;
  }

  public matchHasMoreThanOnePlayer(match: Match): boolean {
    if (!match) return false;

    if (match.playerData.length < 2) return false;

    return true;
  }

  public canStartMatch(match: Match): boolean {
    if (!match) return false;

    if (!this.isHost(match)) return false;

    if (!this.matchHasMoreThanOnePlayer(match)) return false;

    if (match.playerData.find(x => !x.isReady)) return false;

    return true;
  }
}
