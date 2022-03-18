import { Select, Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookAction, MakePaymentAction } from '@actions/dashboard';
import { BookState } from '@state/dashboard/book.state';
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { UpdateFormValue } from '@ngxs/form-plugin';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  id: number;
  inputData: any;
  user: any;
  payment: string;
  @Select(BookState.getSubmitted) public submitted$: Observable<boolean>;
  constructor(
    private toaster: NbToastrService,
    private formBuilder: FormBuilder,
    protected router: Router,
    private store: Store,
    protected windowRef: NbWindowRef,
  ) {}

  ngOnInit() {

    this.inputData = this.windowRef.config.context;

    this.paymentForm = this.formBuilder.group({
        status: new FormControl()
    });  

  }

 

   /**
   * Payment
   */
    onSubmit() {
      /** Use Store to call Action */
      this.payment = this.paymentForm.value.status;
      console.log('this', this.payment)
      this.store.dispatch(new MakePaymentAction(this.inputData.data.id, this.payment)).subscribe(
        res => {
          this.toaster.success("Payment Successful", 'Payment');
          this.paymentForm.reset();
          this.windowRef.close();
        },
        error => { }
      );
    }
  }
  