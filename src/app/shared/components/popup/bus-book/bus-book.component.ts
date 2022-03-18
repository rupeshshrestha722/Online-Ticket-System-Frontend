import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store, Select } from '@ngxs/store';

import { NbDialogRef } from '@nebular/theme';
import { BusListComponent } from 'src/app/modules/dashboard/pages';

@Component({
  selector: 'app-edit-confirmation',
  templateUrl: './bus-book.component.html',
  styleUrls: ['./bus-book.component.scss']
})
export class BusBookComponent implements OnInit {
  bus$: Observable<any>;

  constructor(private dialogRef: NbDialogRef<BusListComponent>, private store: Store) {}

  ngOnInit() {
    this.bus$.subscribe(res => console.log('Booked', res));
  }

  closeWindow() {
    this.dialogRef.close();
  }

  onConfirm($event: any) {
    this.closeWindow();
  }
}
