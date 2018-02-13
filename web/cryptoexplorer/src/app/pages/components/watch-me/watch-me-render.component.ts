import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <span class="fa fa-star-o" (click)="click();"></span>
  `,
  styleUrls: ['./watch-me-render.component.css']
})
export class WatchMeRenderComponent implements ViewCell, OnInit {

  renderValue: number;

  data: string[];

  @Input() value:  string;
  @Input() rowData: any;

  ngOnInit() {
    ;
  }
  click() {
    localStorage
  }
}
