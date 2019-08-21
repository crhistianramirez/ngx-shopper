import { Component } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDateNativeAdapter,
  NgbDateCustomParserFormatter,
} from 'src/app/config/date-picker.config';
import { AppStateService } from 'src/app/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // allows us to use native date object when interacting with ngb-datepicker
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    // defines date format as mm/dd/yyyy
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private appStateService: AppStateService) {
    this.isLoggedIn$ = this.appStateService.isLoggedIn;
  }
}
