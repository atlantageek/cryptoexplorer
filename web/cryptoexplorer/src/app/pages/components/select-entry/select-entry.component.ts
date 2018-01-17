import { Component,  ElementRef, ViewChild, EventEmitter, Input, Output , AfterViewInit} from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table'


@Component({
  selector: 'app-select-entry',
  templateUrl: './select-entry.component.html',
  styleUrls: ['./select-entry.component.css']
})

export class SelectEntryComponent extends DefaultEditor implements AfterViewInit {


    @ViewChild('name') name: ElementRef;

  value = '';

  ngAfterViewInit() {
    //this.listIdent = 'L' + this.cell.getId();
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.getValue();
    }
    console.log(this.cell.getColumn());
    console.log(this.cell.getColumn().getConfig());
  }

  clearText() {
    this.value = '';
    this.reset.emit();
  }

  listIdent="bacon";

  @Input()
  items: {}[] = [];

  @Input()
  labelAttr = ''

  @Input()
  label = '';



  @Output()
  entry: EventEmitter<{}> = new EventEmitter();

  @Output()
  reset: EventEmitter<{}> = new EventEmitter();

  valSelected(value) {
    this.entry.emit(value);
    this.value = value;

  }
}
