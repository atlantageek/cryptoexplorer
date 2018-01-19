import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SelectEntryComponent} from '../select-entry/select-entry.component';
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

  settings = {
    pager:{perPage:20},
    add: {confirmCreate: true},
    delete: {confirmDelete: true},
    edit: {confirmSave: true},
    columns: {
      currency: {
        title: 'Currency',
        editor: {
          type: 'custom',
          component: SelectEntryComponent,
          config:{
            list:[{title:'a',value:'a'},{title:'d',value:'d'},{title:'b',value:'b'},{title:'c',value:'c'}]
          }
        }
      },
      amount: {
        title: 'Amount'
      },
      value: {
        title: 'Value',
        editable: false
      },

    }
  };
  ngOnInit() {
    this._coinService.getCoins().subscribe((coins)=>{
      console.log(coins);
      this.settings.columns.currency.editor.config.list=coins.map((coin)=>{
        return {title:coin['name'],value:coin['name']}; });
      this.settings = Object.assign({}, this.settings);

    //console.log(data);
    })
  }

  deleteEvent(event) {

    console.log("delete");
    event.confirm.resolve();
  }
  editEvent(event) {
    console.log("edit");

    event.confirm.resolve();
  }
  createEvent(event) {
    console.log(this.source);
    console.log("Save");

    event.confirm.resolve();
  }
  store() {
    console.log("Save");
    this.source.getAll().then((data) => {
      console.log(data);
      localStorage.setItem('portfolio', JSON.stringify(data));
    })

  }

}
