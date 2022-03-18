import { Book } from '@core/models';
import { tap, catchError } from 'rxjs/operators';

import { State, Selector, Action, StateContext } from '@ngxs/store';
import { BookService } from '@core/services';
import { AllBookingAction, BookAction, MakePaymentAction } from '@actions/dashboard';
import { Injectable } from '@angular/core';

export class BookStateModel {
  bookList: Book.BookResponse[];
  selectedBook: any;
  submitted: boolean;
  book: {
    model?: Book.BookRequest;
    dirty: boolean;
    status: string;
    errors: {};
  };
}

@State<BookStateModel>({
  name: 'book',
  defaults: {
    bookList: [],
    selectedBook: null,
    submitted: false,
    book: {
      model: {
       passengerName: '',
       email: '',
       mobileNo: '',
       remarks: '',
       noOfSeats: 0,
       fare: 0,
       totalFare: 0,
       user:{
        id: 0,
    },
    bus: {
        id: 0
    },
       status: ''
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class BookState {
  constructor(private bookService: BookService) {}

  /** Get Submitted Value */
  @Selector()
  static getSubmitted(state: BookStateModel) {
    return state.submitted;
  }

  /** Get Selected Book */
  @Selector()
  static getBook(state: BookStateModel) {
    return state.selectedBook;
  }

  /** Get List of Book */
  @Selector()
  static getBookList(state: BookStateModel) {
    return state.bookList;
  }

  /** Add Book */
  @Action(BookAction)
  book({ getState, patchState }: StateContext<BookStateModel>) {
    const state = getState();
    const form = state.book.model;
    console.log('form', form);
    patchState({ ...state, submitted: true });

    return this.bookService
      .book(
        form?.passengerName, form?.email, form?.mobileNo as any, form?.remarks as any, form.noOfSeats, form.fare, form.totalFare, form?.user, form?.bus)
      .pipe(
        tap((res: any) => {
          patchState({
            ...state.bookList,
            submitted: false
          });
        }),
        catchError(err => {
          patchState({ submitted: false });
          throw err;
        })
      );
  }

  /** Get Bus List */
  @Action(AllBookingAction)
  getAllBooking({ getState, patchState }: StateContext<BookStateModel>) {
    const states = getState();
    patchState({ submitted: true });

    return this.bookService.getAllBooking().pipe(
      tap((res: any) => {
        patchState({
          ...states,
          submitted: false,
          bookList: res
        });
      }),
      catchError(err => {
        patchState({
          submitted: false
        });
        throw err;
      })
    );
  }

  /** Make Payment */
  @Action(MakePaymentAction)
  payment({ getState, patchState }: StateContext<BookStateModel>, { id, status }: MakePaymentAction) {
    const state = getState();

    patchState({ ...state, submitted: true });
    return this.bookService
      .makePayment(
        id,
         status
      )
      .pipe(
        tap(res => {
          patchState({});
        }),
        catchError(err => {
          patchState({
            submitted: false
          });
          throw err;
        })
      );
  }

  
}
