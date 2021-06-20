import { Injectable } from '@angular/core';
import { Entity, CloudAppRestService } from "@exlibris/exl-cloudapp-angular-lib";
import { map, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { chunk, omap, combine } from "./utilities";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class HathiTrustSearchService {
  constructor (
    private http: HttpClient,
    private restService: CloudAppRestService,
    private translate: TranslateService
  ) {}

  search(entities: Entity[]) {
    return this.restService.call(`/bibs?mms_id=${entities.map(e=>e.id).join(',')}&view=brief`).pipe(
      map(results=>this.buildHathiSearchQueries(results.bib).filter(q=>!!q)),
      /* Break up Hathitrust query into chunks */
      switchMap((queries: any[])=>forkJoin(chunk(queries, 10)
        .map(q=>this.http.get<any>(`https://catalog.hathitrust.org/api/volumes/brief/json/${q.join('|')}`)))
      ),
      /* Combine results and flaten records array */
      map(results=>results = omap(combine(results), r=>({record: r.records[Object.keys(r.records)[0]], availability: this.calculateAvailability(r.items)})))
    )
  }

  private buildHathiSearchQueries(bibs: any[]) {
    return bibs.map(bib=>{
      let ids = [['id', bib.mms_id]];
      if (bib.network_number) {
        for (let i=0; i<bib.network_number.length; i++) {
          let m = bib.network_number[i].match(/^\(OCoLC\)\s*([ocm|ocn|on]*\d+)\s*/);
          if (m) {
            ids.push(['oclc', m[1]]);
            break;
          }
        }
      }
      const re = /^[\d-]*$/;
      re.test(bib.issn) && ids.push(['issn', bib.issn.trim()]);
      re.test(bib.isbn) && ids.push(['isbn', bib.isbn.trim()]);
      return ids.length > 1 ? ids.map(i=>i.join(':')).join(';') : null;
    });
  }
  
  private calculateAvailability(items: any[]) {
    if (items.length==0)
      return '';
    else if (items.some(i=>/full/i.test(i.usRightsString)))
      return this.translate.instant('Hathi.FullView');
    else 
      return this.translate.instant('Hathi.Limited');
  }
}

