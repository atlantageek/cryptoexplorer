import { Component,  ElementRef, ViewChild, EventEmitter, Input, Output , AfterViewInit} from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table'


@Component({
  selector: 'app-select-entry',
  templateUrl: './select-entry.component.html',
  styleUrls: ['./select-entry.component.css']
})

export class SelectEntryComponent extends DefaultEditor implements AfterViewInit {
  value='';

  @ViewChild('name') name: ElementRef;
  @Input() cell: Cell;
  @Input() inputClass: string = '';
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
  @Output() edited = new EventEmitter<any>();

  ngAfterViewInit() {
    //this.listIdent = 'L' + this.cell.getId();
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.getValue();
    }
    console.log(this.cell.getColumn());
    console.log(this.cell.getColumn().getConfig());
  }

  updateValue() {
    const name = this.name.nativeElement.value;
    console.log("Updating Value");
    console.log(name);
    this.cell.newValue = `${name}`;
  }

    clearText() {
      //this.value = '';
      console.log("CLEAR TEXS");
      this.value='';
      this.name.nativeElement.value = '';
      this.cell.newValue = '';
    }

    listIdent="bacon";



    valSelected(value) {
      this.cell.newValue = value;
      //this.value = value;
    }


  }
