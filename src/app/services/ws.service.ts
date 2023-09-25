import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private connection: signalR.HubConnection;

  constructor(
    private authService: AuthService,
  ) {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.wsUrl}`, {
      accessTokenFactory: () => this.authService.user ? this.authService.user.token : ''
    })
    .withAutomaticReconnect()
    .build();

    this.connection.start();
  }

  public getConnection(): signalR.HubConnection {
    return this.connection;
  }
}
