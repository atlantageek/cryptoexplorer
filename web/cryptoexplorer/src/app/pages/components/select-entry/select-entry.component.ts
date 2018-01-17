import { Component,  EventEmitter, Input, Output , AfterViewInit} from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table'


@Component({
  selector: 'app-select-entry',
  templateUrl: './select-entry.component.html',
  styleUrls: ['./select-entry.component.css']
})

export class SelectEntryComponent extends DefaultEditor implements AfterViewInit {



  value = '';

  ngAfterViewInit() {
    this.listIdent = this.cell.getId();
  }

  clearText() {
    this.value = '';
    this.reset.emit();
  }

  listIdent: string;

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
