export class BookAction {
    static readonly type = '[Book] book';
    
  }

export class AllBookingAction {
    static readonly type = '[AllBooking] All';
}

export class MakePaymentAction {
  static readonly type = '[Payment] payment';

  constructor (public id: number, public status: string){}
}

export class EditBookAction {
  static readonly type = '[Edit] Book';

  constructor (public id: number, public payload: any){}
}