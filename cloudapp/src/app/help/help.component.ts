import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help',
  template: `
  <div class="cloudapp-actions">
    <button mat-flat-button color="secondary" [routerLink]="['/']">
      {{'Help.Back' | translate}}
    </button>
  </div>
  <p translate>Help.Text</p>
  <p><a translate href="https://github.com/ExLibrisGroup/alma-hathitrust-availability/issues" target="_blank">Help.Open</a></p>
  `,
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
