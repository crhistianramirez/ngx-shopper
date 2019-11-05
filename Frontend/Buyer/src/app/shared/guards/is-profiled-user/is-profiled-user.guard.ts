import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { BaseResolveService } from '../../services/base-resolve/base-resolve.service';

@Injectable({
  providedIn: 'root',
})
export class IsProfiledUserGuard implements CanActivate {
  constructor(private baseResolveService: BaseResolveService) {}

  canActivate(): boolean {
    // can't access anything from appStateService because
    // that gets set in baseResolve and all guards get hit before all resolves
    return !this.baseResolveService.isAnon();
  }
}
