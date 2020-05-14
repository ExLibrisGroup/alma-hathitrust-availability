import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppEventsService, EntityType, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { HttpClient } from '@angular/common/http';
import { HathitrustSearch } from '../hathitrust';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private pageLoad$: Subscription;
  private hathi: HathitrustSearch;
  bibs: any[] = [];
  loading = false;

  constructor(
    private eventsService: CloudAppEventsService,
    private restService: CloudAppRestService,
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.hathi = new HathitrustSearch(this.http, this.restService, this.translate)
    this.pageLoad$ = this.eventsService.onPageLoad( pageInfo => {
      const entities = (pageInfo.entities||[]).filter(e=>e.type==EntityType.BIB_MMS);
      if (entities.length > 0) {
        this.loading = true;
        this.bibs = entities;
        this.hathi.search(entities)
        .subscribe({
          next: results => Object.keys(results).forEach(key=>this.bibs.find(b=>b.id==key).hathi=results[key]),
          complete: () => this.loading = false
        });
      }
    });  
  }

  ngOnDestroy(): void {
    this.pageLoad$.unsubscribe();
  }
}