import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { MainComponent } from './components/main/main.component';
import {  RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing-module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CoinService } from '../coin.service';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SelectEntryComponent } from './components/select-entry/select-entry.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [PagesComponent, MainComponent, PortfolioComponent, SelectEntryComponent],
  providers: [CoinService],
  exports:[PagesComponent],
  entryComponents:[SelectEntryComponent]
})
export class PagesModule { }
