import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, getTranslateModule } from '@exlibris/exl-cloudapp-angular-lib';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { HathiTrustSearchService } from './hathitrust.service';
import { HelpComponent } from './help/help.component';

export function getToastrModule() {
  return ToastrModule.forRoot({
    positionClass: 'toast-top-right',
    timeOut: 2000
  });
}

@NgModule({
  declarations: [	
    AppComponent,
    MainComponent,
      HelpComponent
   ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    getTranslateModule(),
    getToastrModule()
  ],
  providers: [
    HathiTrustSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
