import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {CoinService} from '../../../coin.service'
import {PriceChangeRenderComponent} from '../price-change-render/price-change-render.component';
import { CurrencyRenderComponent} from '../currency-render/currency-render.component';
import { WatchMeRenderComponent} from '../watch-me/watch-me-render.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('search') searchEntry;
  data=[];
  source = null;
  settings = {actions: {
    edit: false, delete: false,
      custom: [
        {
          name: 'select',
          title: '<span class="fa fa-star-o"></span> ',
        }
      ],
    },

     hideSubHeader: true,
    pager:{perPage:20},
    columns: {
      rank: {
        title: 'Rank'
      },
      name: {
        title: 'Name'
      },
      symbol: {
        title: 'Symbol'
      },
      price_usd: {
        title: 'Price ($)',
        type: 'custom',
        renderComponent: CurrencyRenderComponent,
      },
      price_change: {
        title: 'Price Change(hour/day/week)',
        type: 'custom',
        renderComponent: PriceChangeRenderComponent,
      },
      market_cap: {
        title: 'MarketCap',
        type: 'custom',
        renderComponent: CurrencyRenderComponent,
      }
    }
  };
  constructor(private _coinService:CoinService) {}
  currencyFormat(number) {

    let nbr = new Number(number);
    return nbr.toLocaleString()
  };
  select(event) {
    console.log(event);
  }
  onReset() {
    console.log("Reset");
    console.log(this.searchEntry.nativeElement.value='');
    this.searchEntry.value='';
    this.source.reset();
  }
  onSearch(query: string = '') {
    this.source.setFilter([
    // fields we want to include in the search

      {
        field: 'name',
        search: query
      }

    ], false);
  // second parameter specifying whether to perform 'AND' or 'OR' search
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
  }
  ngOnInit() {
    this._coinService.getCoins().subscribe((coins)=>{

      console.log(coins);
      this.data=coins.map((record)=>{
        //record['price']=this.currencyFormat(record['price_usd']);
        //record['market_cap']=this.currencyFormat(record['market_cap']);
        record['price_change'] = `${record['pct_chg_1h']},${record['pct_chg_24h']},${record['pct_chg_7d']}`;
        return record;
    })
    this.source = new LocalDataSource(this.data);
    //console.log(data);
  })
}

}
