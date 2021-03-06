import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AppAuthService } from '../../../auth/services/auth.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private appAuthService: AppAuthService,
  ) { }

  canActivate(): boolean {
    return !this.appAuthService.isUserAnon();
  }
}
