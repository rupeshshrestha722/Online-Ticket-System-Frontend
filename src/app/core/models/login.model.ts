export namespace Login {
    export interface Form {
      username: string;
      password: string;
      rememberMe: boolean;
    }
  
    export interface Request {
      username: string;
      password: string;
    }
  
    export interface SuccessResponse {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      role: string;
      token: string;
    }
  
    export interface ErrorResponse {
      message: string;
    }
  }
  