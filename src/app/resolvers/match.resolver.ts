import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Match } from '../models/Match';
import { MatchService } from '../services/match.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class MatchResolver implements Resolve<Match | null> {
  constructor(
    private matchService: MatchService,
    private loaderService: LoaderService
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Match | null> {
    this.loaderService.started();

    try {
      try {
        const match = await this.matchService.getMatchByAuth();
        return match;
      } catch (err) {
        return null;
      }
    } finally {
      this.loaderService.completed();
    }
  }
}
