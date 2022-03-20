export class GetBusAction {
    static readonly type = '[Bus] Get';
  }
  
  export class AddBusAction {
    static readonly type = '[Bus] Add';

      
    constructor(public payload:any) {}
  }
  
  export class EditBusAction {
    static readonly type = '[Bus] Edit';
  
    constructor(public id: number, public payload:any) {}
  }
  
  export class SetSelectedBusAction {
    static readonly type = '[Bus] GetById';
    constructor(public payload: any) {}
  }
  