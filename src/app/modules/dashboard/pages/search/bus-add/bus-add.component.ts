import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AddBusAction, BookAction } from '@actions/dashboard';
import { BookState } from '@state/dashboard/book.state';
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { BusState } from '@state/dashboard';
@Component({
  selector: 'app-bus-add',
  templateUrl: './bus-add.component.html',
  styleUrls: ['./bus-add.component.scss']
})
export class AddBusComponent implements OnInit {

  busForm: FormGroup;
  @Select(BusState.getSubmitted) public submitted$: Observable<boolean>;
  constructor(
    private toaster: NbToastrService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private store: Store,
    protected windowRef: NbWindowRef,
  
  ) {}

  ngOnInit() {

   
    this.busForm = this.formBuilder.group({
      busNo: new FormControl('', [Validators.required]),
      busModel: new FormControl('', [Validators.required]),
      noOfSeats: new FormControl('', [Validators.required]),
      fare: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      departureDate: new FormControl('', [Validators.required]),
      arrivalDate: new FormControl('', [Validators.required])
    });


  

  }

 

  /**
   * Add Bus Submit Function 
   */
  onSubmit() {
    /** Use Store to call Action */
    console.log('val', this.busForm.value);
    this.store.dispatch(new AddBusAction(this.busForm.value)).subscribe(
        res => {
          this.toaster.success("Added Successfully", 'Bus');
          // this.store.dispatch(new StateReset(DepartmentState));
          this.busForm.reset();
          
          this.windowRef.close();
        },
        error => {}
      );
    }
}
