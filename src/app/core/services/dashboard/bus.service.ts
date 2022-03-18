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
   * @param noOfseats No of Seats
   * @param fare Fare
   * @param soruce Source
   * @param destination Destination
   * @param departureDate DepartureDate
   * @param arrivalDate Arrival Date
   */
  addBus(
    busNo: string | undefined,
    busModel: string | undefined,
    noOfseats: number | undefined,
    fare: number | undefined,
    source: string | undefined,
    destination: string | undefined,
    departureDate: string | undefined,
    arrivalDate: string | undefined
  ) {
    return this.httpClient.post<Bus.BusRequest>(`${API_URL}/schedules`, {
      busNo,
      busModel,
      noOfseats,
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
