export class ToasterSuccessAction {
    static readonly type = '[Toaster] Success';
  
    constructor(public message: string, public title: string) {}
  }
  
  export class ToasterErrorAction {
    static readonly type = '[Toaster] Error';
  
    constructor(public error: string, public title: string) {}
  }
  