import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { OnInit, Component } from '@angular/core';

import { NbWindowService, NbWindowRef, NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { CustomServerDataSource, SmartTableConfig } from '@core/services';
import { BookComponent } from '../book/book.component';
import { LoginState } from '@state/auth';
import { Login } from '@core/models';
import { AddBusComponent } from '../bus-add/bus-add.component';
import { EditBusComponent } from '../bus-edit/bus-edit.component';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {
  busDataSource: CustomServerDataSource;
  @Select(LoginState.currentUser) currentUser: Observable<Login.SuccessResponse>;
  roleList: any;
  role: any;

  windowRef: NbWindowRef;
  constructor(
    private httpClient: HttpClient,
    private smartTableConfig: SmartTableConfig,
    private windowService: NbWindowService,
  ) {
    this.currentUser.subscribe(res => {
      if (res !== null) {
        this.role = res.role;
      }
    });

  }

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,    
      custom: [
        {
          name: 'edit',
          title: '<i class="eva eva-edit-2-outline"></i>'
        },
        {
          name: 'book',
          title: '<i class="eva eva-film-outline"></i>',
        
        },
        
        
      ],
    },

    columns: {
      source: {
        title: 'Source'
      },
      destination: {
        title: 'Destination'
      },
      busNo: {
        title:'Bus No',
        filter: false
      },
      busModel: {
        title: 'Bus Model',
        filter: false
      },
      fare: {
        title: 'Fare',
        filter: false
      },
      noOfSeats: {
        title: 'Seat Available',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value: any) => {
         
            if(value > 0) {
               
             return '<span class="success">' +value +'</span>';
            }else {
              return '<span class="danger">'+ value + ' </span>';

            }
         } 
      }
    },
    isMultiSelectVisible: true,
    pager: {
      perPage: 10
    },

  //    rowClassFunction: (row: any) => {
  //     if(this.role == 'USER'){
  //       delete this.settings.actions.custom
  //   } else {
  //       return 'hide-action';
  //   }
  // }
    
  };


  ngOnInit() {
    this.busDataSource = new CustomServerDataSource(this.httpClient, '/schedules');
  }

  addBus() {
    this.windowService.open(AddBusComponent, { title: 'Add Bus Schedule' });
  }

  onSaveConfirm(event: any) {

    if(event.action == 'book'){
    this.windowRef = this.windowService.open(BookComponent, {
      title: 'Bus Booked',
      context: {
        isEdit: true,
        bus: event.data
      }
    });
    this.windowRef.onClose.subscribe(res => {
      this.busDataSource.refresh();
    });
  }else if(event.action == 'edit') {
    this.windowRef = this.windowService.open(EditBusComponent, {
      title: 'Edit Bus Schedule',
      context: {
        isEdit: true,
        data: event.data
      }
    });
    this.windowRef.onClose.subscribe(res => {
      this.busDataSource.refresh();
    });
  }

  }

 
}
