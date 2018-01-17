import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {CoinService} from '../../../coin.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data=[];
  settings = {
    actions: false,
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
      price: {
        title: 'Price ($)'
      },
      price_change: {
        title: 'Price Change(hour/day/week)'
      },
      market_cap: {
        title: 'MarketCap'
      }
    }
  };
  constructor(private _coinService:CoinService) {}
  currencyFormat(number) {
    let nbr = new Number(number);
     return nbr.toLocaleString()
  };

  ngOnInit() {
    this._coinService.getCoins().subscribe((coins)=>{
      console.log(coins);
      this.data=coins.map((record)=>{
        record['price']=this.currencyFormat(record['price_usd']);
        record['market_cap']=this.currencyFormat(record['market_cap']);
        record['price_change'] = `${record['pct_chg_1h']}%/ ${record['pct_chg_24h']}%/ ${record['pct_chg_7d']}%`;
        return record;
    })
    //console.log(data);
  })
}

}
