import { Select, Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookAction, EditBookAction, MakePaymentAction } from '@actions/dashboard';
import { BookState } from '@state/dashboard/book.state';
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { UpdateFormValue } from '@ngxs/form-plugin';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup;
  id: number;
  inputData: any;
  user: any;
  fare: any;
  total: any;
  @Select(BookState.getSubmitted) public submitted$: Observable<boolean>;
  constructor(
    private toaster: NbToastrService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private store: Store,
    protected windowRef: NbWindowRef,
  
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('login.currentUser') || '');
  
    this.inputData = this.windowRef.config.context;
      console.log('this.input', this.inputData);
    this.fare = this.inputData.data.fare;
   
    this.bookForm = this.formBuilder.group({
      passengerName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      noOfSeats: new FormControl(),
      fare: new FormControl(),
      totalFare: new FormControl(),
    
    }); 

    this.total = this.fare * this.bookForm.value.noOfSeats;

    this.store.dispatch([
      new UpdateFormValue({
        value: {
          passengerName: this.inputData.data.passengerName,
          email: this.inputData.data.email,
          mobileNo: this.inputData.data.mobileNo,
          fare: this.inputData.data.fare,
          noOfSeats: this.inputData.data.noOfSeats,
          remarks: this.inputData.data.remarks
          
        },
        path: 'book.edit'

      })
  ]);

   
  }

 

   /**
   * Payment
   */
    onSubmit() {
      /** Use Store to call Action */

      this.store.dispatch(new EditBookAction(this.inputData.data)).subscribe(
        res => {
          this.toaster.success("Updated Successfully", 'Booking');
          this.bookForm.reset();
          this.windowRef.close();
        },
        error => { }
      );
    }
  }
  