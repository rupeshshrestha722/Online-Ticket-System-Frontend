import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '@env';

import { User, Login } from '@core/models';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Authenticates the user with credentials
   * @param username User's Username
   * @param password User's Password
   */
  authenticate(username: string, password: string) {
    return this.httpClient.post<Login.SuccessResponse>(`${API_URL}/login`, {
      username,
      password
    });
  }
}
