import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/alert';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  alerts: Alert[] = [];

  private _subscription: Subscription;

  constructor(private _alertService: AlertService) {
    this._subscription = this._alertService.getObservable().subscribe(alert => {
      this._addAlert(alert)
    })
  }

  private _addAlert(alert: Alert) {
    this.alerts.push(alert);

    if (alert.timeout !== 0) {
      setTimeout(() => this.close(alert), alert.timeout);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  close(alert: Alert) {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  }

  className(alert: Alert | null): string {
    if (alert === null)
      return "bg-appWhite";

    switch (alert.type) {
      case AlertType.success:
        return "bg-appGreen";
      case AlertType.warning:
        return "bg-appWhite";
      case AlertType.error:
        return "bg-appRed";
      default:
        return "bg-appBlue";
    }
  }
}