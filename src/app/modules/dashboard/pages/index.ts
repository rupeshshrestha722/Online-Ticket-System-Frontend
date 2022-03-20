
// Import the Component

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './search/book/book.component';
import { BusListComponent } from './search/bus-list/bus-list.component';
import { BookingListByUserComponent } from './booking/booking-by-user-list/booking-by-user-list.component';
import { PaymentComponent } from './payment/payment.component';
import { EditBookComponent } from './search/book/book-edit/book-edit.component';
import { AddBusComponent } from './search/bus-add/bus-add.component';
import { EditBusComponent } from './search/bus-edit/bus-edit.component';

// Add it to a named exported object components
export const components: any[] = [
  DashboardComponent,
  HomeComponent,
  BusListComponent,
  AddBusComponent,
  EditBusComponent,
  BookComponent,
  EditBookComponent,
  BookingListByUserComponent,
  PaymentComponent
];

// Export the Component

export * from './dashboard.component';
export * from './home/home.component';
export * from './search/bus-list/bus-list.component';
export * from './search/book/book.component';
export * from './booking/booking-by-user-list/booking-by-user-list.component';
export * from './payment/payment.component';
export * from './search/book/book-edit/book-edit.component';
export * from './search/bus-add/bus-add.component';
export * from './search/bus-edit/bus-edit.component';