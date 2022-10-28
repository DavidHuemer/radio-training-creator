import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {

  @Input() userName: string | null = null;
  @Input() title = '';

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  logoutClicked() {
    this.logout.emit();
  }
}
