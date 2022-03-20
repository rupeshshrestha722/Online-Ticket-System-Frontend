import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env';
import { Bus } from '@core/models';

const API_URL = environment.baseApiUrl;
@Injectable({
  providedIn: 'root'
})
export class BusService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Add Bus
   * @param busNo Bus No
   * @param busModel Bus Model
   * @param noOfSeats No of Seats
   * @param fare Fare
   * @param soruce Source
   * @param destination Destination
   * @param departureDate DepartureDate
   * @param arrivalDate Arrival Date
   */
  addBus(
    busNo: string,
    busModel: string,
    noOfSeats: number,
    fare: number,
    source: string,
    destination: string,
    departureDate: string,
    arrivalDate: string
  ) {
    return this.httpClient.post<Bus.BusRequest>(`${API_URL}/schedules`, {
      busNo,
      busModel,
      noOfSeats,
      fare,
      source,
      destination,
      departureDate,
      arrivalDate
    });
  }

  /**
   * Edit Bus
   * @param id Id
   * @param busNo Bus No
   * @param busModel Bus Model
   * @param noOfSeats No of Seats
   * @param fare Fare
   * @param soruce Source
   * @param destination Destination
   * @param departureDate DepartureDate
   * @param arrivalDate Arrival Date
   */
   editBus(
     id: number,
    busNo: string,
    busModel: string,
    noOfSeats: number,
    fare: number,
    source: string,
    destination: string,
    departureDate: string,
    arrivalDate: string
  ) {
    return this.httpClient.put<Bus.BusRequest>(`${API_URL}/schedules/${id}`, {
      busNo,
      busModel,
      noOfSeats,
      fare,
      source,
      destination,
      departureDate,
      arrivalDate
    });
  }

  /**
   * Get All Bus
   */
  getAllBus() {
    return this.httpClient.get(`${API_URL}/schedules`);
  }

 
}
