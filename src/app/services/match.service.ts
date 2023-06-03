import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../models/Match';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private interval: any;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.user?.token}`
    })
  }

  public activeMatch: Match | null | undefined;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public startPing() {
    this.getMatchByAuth().then((match) => {
      this.activeMatch = match;

      this.interval = setInterval(() => {
        this.getMatchByAuth().then((match) => {
          this.activeMatch = match;
        }).catch((res) => {
          if (res.status === 404)
            this.activeMatch = null;
        })
      }, environment.pingInterval);
    }).catch((res) => {
      if (res.status === 404)
        this.activeMatch = null;
    });
  }

  public endPing() {
    clearInterval(this.interval);
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
}
