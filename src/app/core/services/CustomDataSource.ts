import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class CustomServerDataSource extends LocalDataSource {
  lastRequestCount = 0;
  requestUrl: string;

  constructor(private http: HttpClient, @Inject(String) private endpoint: string) {
    super();
    this.requestUrl = environment.baseApiUrl + endpoint;
  }

  override count(): number {
    return this.lastRequestCount;
  }

  override getElements(): Promise<any> {
    let url = this.requestUrl + '?';

    if (this.sortConf) {
      this.sortConf.forEach(fieldConf => {
        url += `sortBy=${fieldConf.field}&sortOrder=${fieldConf.direction.toUpperCase()}&`;
      });
    }

    if (this.pagingConf && this.pagingConf.page && this.pagingConf.perPage) {
      const offset = (this.pagingConf.page - 1) * this.pagingConf.perPage;
      url += `offset=${offset}&limit=${this.pagingConf.perPage}&`;
    }

    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf:any) => {
        if (fieldConf.search) {
          url += `${fieldConf.field}=${fieldConf.search}&`;
        }
      });
    }

    return this.http
      .get(url, { observe: 'response' })
      .pipe(
        map((res:any) => {
          this.lastRequestCount = res.body['total'];
          return res.body['results'];
        })
      ).toPromise();
  }
}
