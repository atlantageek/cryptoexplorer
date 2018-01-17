import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SelectEntryComponent} from '../select-entry/select-entry.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public portfolio = [];
  source: LocalDataSource;
  constructor() {
     this.source = new LocalDataSource(this.portfolio);
  }

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
          list:['a','b','ccc','dddd']
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
