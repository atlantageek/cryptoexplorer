import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <span [ngClass]="{down: data[0] < 0, up:data[0]>0}">{{data[0]}}</span>% / <span [ngClass]="{down: data[1] < 0, up:data[1]>0}">{{data[1]}}</span>% / <span [ngClass]="{down: data[2] < 0, up:data[2]>0}">{{data[2]}}</span>%
  `,
  styleUrls: ['./price-change-render.component.css']
})
export class PriceChangeRenderComponent implements ViewCell, OnInit {

  renderValue: number;

  data: string[];

  @Input() value:  string;
  @Input() rowData: any;

  ngOnInit() {
    this.data = this.value.split(',');
  }

}
