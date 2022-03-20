import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env';
import { Book } from '@core/models';

const API_URL = environment.baseApiUrl;
@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Book
   * @param passengerName Passenger Name
   * @param email Email
   * @param mobileNo Mobile No
   * @param remarks Remarks
   * @param userId UserId
   * @param busId Bus id
   */
  book(
    passengerName: string,
    email: string,
    mobileNo: number,
    remarks: number,
    noOfSeats: number,
    fare: number,
    totalFare: number,
    user: any,
    bus: any
  ) {
    return this.httpClient.post<Book.BookRequest>(`${API_URL}/booking`, {
        passengerName,
        email,
        mobileNo,
        remarks,
        noOfSeats,
        fare,
        totalFare,
        user,
        bus,
    });
  }

    /**
   * Edit Book
   * @param id id
   * @param passengerName Passenger Name
   * @param email Email
   * @param mobileNo Mobile No
   * @param remarks Remarks
   * @param userId UserId
   * @param busId Bus id
   */
     editBook(
       id: number,
      passengerName: string,
      email: string,
      mobileNo: number,
      remarks: number,
      noOfSeats: number,
      fare: number,
      totalFare: number,
      user: any,
      bus: any
    ) {
      return this.httpClient.put<Book.BookRequest>(`${API_URL}/booking/${id}`, {
          passengerName,
          email,
          mobileNo,
          remarks,
          noOfSeats,
          fare,
          totalFare,
          user,
          bus,
      });
    }

  /**
   * Get All Booking
   */
  getAllBooking() {
    return this.httpClient.get(`${API_URL}/booking/self`);
  }

  /**
   * Make Payment
   */
  makePayment(bookingId: number,status: string) {
    return this.httpClient.put(`${API_URL}/booking/payment/${bookingId}`, {
      status
    });
  }

 
}
