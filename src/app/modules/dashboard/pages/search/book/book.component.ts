import { Select, Store } from '@ngxs/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookAction } from '@actions/dashboard';
import { BookState } from '@state/dashboard/book.state';
import { Observable } from 'rxjs';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { UpdateFormValue } from '@ngxs/form-plugin';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

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
    this.fare = this.inputData.bus.fare;
   
    this.bookForm = this.formBuilder.group({
      passengerName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      noOfSeats: new FormControl(),
      fare: new FormControl(),
      totalFare: new FormControl(),
      user: new FormGroup({
        id: new FormControl()
      }),
      bus: new FormGroup({
        id: new FormControl()
      })
    });

    this.total = this.fare * this.bookForm.value.noOfSeats;

    this.store.dispatch([
        new UpdateFormValue({
          value: {
            user: {
              id: this.user.id
            },
            bus:  {
              id:this.inputData.bus.id
            },
            fare: this.inputData.bus.fare,
            totalFare: this.total
          },
          path: 'book.book'

        })
    ]);
  

  }

 

  /**
   * Book 
   */
  onSubmit() {
    /** Use Store to call Action */
    this.store.dispatch(new BookAction()).subscribe(
      res => {
        this.toaster.success("Booked Successfully", 'Booked');
        this.router.navigateByUrl('/booking');
        // this.store.dispatch(new StateReset(DepartmentState));
        this.bookForm.reset();
        
        this.windowRef.close();
      },
      error => {}
    );
  }
}
