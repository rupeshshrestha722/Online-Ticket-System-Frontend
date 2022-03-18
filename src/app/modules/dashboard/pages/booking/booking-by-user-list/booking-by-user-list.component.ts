
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { OnInit, Component } from '@angular/core';

import { NbWindowService, NbDialogService, NbWindowRef } from '@nebular/theme';
import { BookState } from '@state/dashboard/book.state';
import { AllBookingAction } from '@actions/dashboard';
import { PaymentComponent } from '../../payment/payment.component';
import { SmartTableConfig } from '@core/services';
@Component({
  selector: 'app-booking-by-user-list',
  templateUrl: './booking-by-user-list.component.html',
  styleUrls: ['./booking-by-user-list.component.scss']
})
export class BookingListByUserComponent implements OnInit {
  @Select(BookState.getBookList) list$: Observable<any>;
  @Select(BookState.getBook) book: Observable<any>;
  booklist: any;
  windowRef: NbWindowRef;
  
  // settings: object = {};

  constructor(
    private store: Store,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
    private smartTableConfig: SmartTableConfig,
  ) {
   

  }

  
  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,    
      custom: [
        {
          name: 'payment',
          title: '<i class="eva eva-film-outline"></i>',
        
        },
        
      ],
    },

    columns: {
      passengerName: {
        title: 'Passenger Name'
      },
      email: {
        title: 'Email',
        filter: false
      },
      mobileNo: {
          title: 'Mobile No',
          filter: false
      },
      fare: {
        title: 'Fare',
        filter: false
      },
      totalFare: {
          title: 'Total Fare',
          filter: false
      },
     
      status: {
         title: ' Payment',
         type: 'html',
         valuePrepareFunction: (value: any) => {
          
             if(value == null) {
                
              return '<span class="danger">Payment Not Done</span>';
             }else {
               return '<span class="success">Payment Done By ' + value + ' </span>';

             }
          }  
      },

    },
    isMultiSelectVisible: true,
    pager: {
      perPage: 10
    },
    // filter: {
    //   inputClass: 'input-full-width size-medium shape-semi-round',
      
    
    // },
    rowClassFunction: (row: any) => {
      if(row.data.status == null){
        return '';
    } else {
          
        return 'hide-action';
    }
  }
   
    
  };

  ngOnInit() {
  console.log('tester', this.settings.columns['status']);
//     if (this.settings.columns["status"].hasOwnProperty("data")) {
//       if (this.settings.columns["status"].data == false) {
//         delete this.settings.actions.custom;
//       }
// }
   
    this.store.dispatch(new AllBookingAction());
    this.list$.subscribe((res:any) => {
      this.booklist = res;
     
    }
     
      );
  }

  onSaveConfirm(event: any) {

    this.windowRef = this.windowService.open(PaymentComponent, {
      title: 'Make Payment',
      context: {
        isEdit: true,
        data: event.data
      }
    });
  }

 


}
