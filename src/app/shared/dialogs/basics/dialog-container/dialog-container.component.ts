import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements OnInit {

  @Input() title = "";
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  exitClicked() {
    this.exit.emit();
  }
}
