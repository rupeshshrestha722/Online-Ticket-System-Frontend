export namespace Bus {
    export interface BusRequest {
      busNo: string;
      busModel: string;
      noOfSeats: number;
      fare: number;
      source: string;
      destination: string;
      departureDate: string;
      arrivalDate: string;
    }
  
    export interface BusResponse {
        id: number;
        busNo: string;
        busModel: string;
        noOfSeats: number;
        fare: number;
        source: string;
        destination: string;
        departureDate: string;
        arrivalDate: string;
    }
  
    export interface DepartmentEditRequest {
        id: number;
        busNo: string;
        busModel: string;
        noOfSeats: number;
        fare: number;
        source: string;
        destination: string;
        departureDate: string;
        arrivalDate: string;
    }
  }
  