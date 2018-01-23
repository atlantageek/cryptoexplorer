import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SelectEntryComponent} from '../select-entry/select-entry.component';
import { CurrencyRenderComponent} from '../currency-render/currency-render.component';
import {CoinService} from '../../../coin.service'


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public portfolio = [];
  source: LocalDataSource;
  constructor(private _coinService:CoinService) {
     this.source = new LocalDataSource(this.portfolio);
  }
  currencyList=[];
  price_lookup = {};
  pct_change_lookup={};
  networth = 0;

  settings = {
    hideSubHeader: false,
    pager:{perPage:20},
    add: {confirmCreate: true},
    delete: {confirmDelete: true},
    edit: {confirmSave: true},
    columns: {
      currency: {
        title: 'Currency',
        filter: false,

        editor: {
          type: 'custom',
          component: SelectEntryComponent,
          config:{
            list:[]
          }
        }
      },
      amount: {
        filter: false,
        title: 'Amount'
      },
      value: {
        filter: false,
        title: 'Value',
        editable: false,
        addable: false,
        type: 'custom',
        renderComponent: CurrencyRenderComponent,
      },
      change: {
        filter: false,
        title: "Day's Change",
        editable: false,
        type: 'custom',
        renderComponent: CurrencyRenderComponent,
      }

    }
  };
  ngOnInit() {
    this._coinService.getCoins().subscribe((coins)=>{
      console.log(coins);
      this.settings.columns.currency.editor.config.list=coins.map((coin)=>{
        return {title:coin['name'],value:coin['name']};
      });
      for (let i=0; i<coins.length;i++) {
        this.price_lookup[coins[i]['name']] = coins[i]['price_usd'];
        this.pct_change_lookup[coins[i]['name']] = coins[i]['pct_chg_24h'];
      }

      this.settings = Object.assign({}, this.settings);
      this.load();
    })

  }


  deleteEvent(event) {

    console.log("delete");
    event.confirm.resolve();

  }
  editEvent(event) {
    console.log("edit");
    console.log(event.newData);
    event.newData= this.doCalcs(event.newData);
    event.confirm.resolve(event.newData);
    this.storeLater();

    //this.store();


  }
  createEvent(event) {
    console.log(this.source);
    console.log("Save");
    event.newData= this.doCalcs(event.newData);
    event.confirm.resolve(event.newData);
    this.storeLater();
    //this.store();

  }

  doCalcs(data) {
    let price = this.price_lookup[ data['currency']];
    data['value'] = parseFloat(data['amount']) * price;

    let pct = this.pct_change_lookup[ data['currency']];
    data['change'] = parseFloat(data['value']) * pct/100.0;
    return data;
  }
  storeLater() {
    setTimeout(() => {this.store();}, 1000)
  }
  store() {

    this.source.getAll().then((data) => {
      console.log("SaveII");
      console.log(data);
      localStorage.setItem('portfolio', JSON.stringify(data));
    });
  }
  load() {

    let data = JSON.parse(localStorage.getItem('portfolio'));
    this.networth = 0;
    for (var i=0;i<data.length;i++) {
      data[i]=this.doCalcs(data[i]);
      this.networth += data[i]['value'];
    }

    this.source.load(data);

  }

}
