export namespace Book {
    export interface BookRequest {
        passengerName: string;
        email: string;
        mobileNo: string;
        remarks: string;
        noOfSeats: number;
        fare: number;
        totalFare: number;
        user:{
            id: number;
        }
        bus: {
            id: number;
        }
        status: string;
    }
  
    export interface BookResponse {
        id: number;
        passengerName: string;
        email: string;
        mobileNo: string;
        remarks: string;
        noOfSeats: number;
        fare: number;
        totalFare: number;
        user:{
            id: number;
        }
        bus: {
            id: number;
        }
        status: string;
    }

  }
  