import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {  EditBusAction } from '@actions/dashboard';
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { BusState } from '@state/dashboard';
@Component({
  selector: 'app-bus-edit',
  templateUrl: './bus-edit.component.html',
  styleUrls: ['./bus-edit.component.scss']
})
export class EditBusComponent implements OnInit {

  busForm: FormGroup;
  inputData: any;
  @Select(BusState.getSubmitted) public submitted$: Observable<boolean>;
  constructor(
    private toaster: NbToastrService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private store: Store,
    protected windowRef: NbWindowRef,
  
  ) {}

  ngOnInit() {
    this.inputData = this.windowRef.config.context;
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

    this.store.dispatch([
      new UpdateFormValue({
        value: {
          busNo: this.inputData.data.busNo,
          busModel: this.inputData.data.busModel,
          noOfSeats: this.inputData.data.noOfSeats,
          fare: this.inputData.data.fare,
          source: this.inputData.data.source,
          destination: this.inputData.data.destination,
          departureDate: this.inputData.data.departureDate,
          arrivalDate: this.inputData.data.arrivalDate
          
        },
        path: 'bus.edit'

      })
  ]);


  

  }

 

  /**
   * Edit Bus Submit Function 
   */
  onSubmit() {
    /** Use Store to call Action */
    console.log('val', this.busForm.value);
    this.store.dispatch(new EditBusAction(this.inputData.data.id, this.busForm.value)).subscribe(
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
