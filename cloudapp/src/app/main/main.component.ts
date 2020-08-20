import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CloudAppEventsService, EntityType } from '@exlibris/exl-cloudapp-angular-lib';
import { HathiTrustSearchService } from '../hathitrust.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private hathi: HathiTrustSearchService
  ) { }

  ngOnInit() {
    this.pageLoad$ = this.eventsService.onPageLoad( pageInfo => {
      const entities = (pageInfo.entities||[]).filter(e=>e.type==EntityType.BIB_MMS);
      if (entities.length > 0) {
        this.loading = true;
        this.bibs = entities;
        this.hathi.search(entities).pipe(
          finalize(() => this.loading = false)
        )
        .subscribe({
          next: results => Object.keys(results).forEach(key=>this.bibs.find(b=>b.id==key).hathi=results[key]),
          error: e => this.toastr.error(`An error occurred while loading availability: ${e.message}`),
        });
      }
    });  
  }

  ngOnDestroy(): void {
    this.pageLoad$.unsubscribe();
  }
}