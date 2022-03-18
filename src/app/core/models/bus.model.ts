export namespace Bus {
    export interface BusRequest {
      busNo: string;
      busModel: string;
      noOfseats: number;
      fare: number;
      source: string;
      destination: string;
      departureDate: string;
      arrivalDate: String;
    }
  
    export interface BusResponse {
        id: number;
        busNo: string;
        busModel: string;
        noOfseats: number;
        fare: number;
        source: string;
        destination: string;
        departureDate: string;
        arrivalDate: String;
    }
  
    export interface DepartmentEditRequest {
        id: number;
        busNo: string;
        busModel: string;
        noOfseats: number;
        fare: number;
        source: string;
        destination: string;
        departureDate: string;
        arrivalDate: String;
    }
  }
  