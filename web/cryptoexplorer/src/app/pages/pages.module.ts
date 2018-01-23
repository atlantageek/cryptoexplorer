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
import { CurrencyRenderComponent } from './components/currency-render/currency-render.component';
import { PriceChangeRenderComponent } from './components/price-change-render/price-change-render.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [PagesComponent, MainComponent, PortfolioComponent, SelectEntryComponent, CurrencyRenderComponent, PriceChangeRenderComponent],
  providers: [CoinService],
  exports:[PagesComponent],
  entryComponents:[SelectEntryComponent, CurrencyRenderComponent, PriceChangeRenderComponent]
})
export class PagesModule { }
