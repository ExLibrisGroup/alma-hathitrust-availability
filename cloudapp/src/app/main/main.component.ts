import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppEventsService, EntityType } from '@exlibris/exl-cloudapp-angular-lib';
import { HathiTrustSearchService } from '../hathitrust.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private pageLoad$: Subscription;
  bibs: any[] = [];
  loading = false;

  constructor(
    private eventsService: CloudAppEventsService,
    private hathi: HathiTrustSearchService
  ) { }

  ngOnInit() {
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