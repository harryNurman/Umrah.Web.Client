import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ResourceService<T, S> {
  private readonly APIUrl = environment.apiBaseUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  fromListToModel(json: any): S {
    return json;
  }

  getList(
    columnName: string,
    columnValue: string,
    pageNo: number,
    pageSize: number
  ): Observable<Task[]> {
    let params = new HttpParams()
      .set('searchColumn', columnName.toString())
      .set('searchValue', columnValue.toString())
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient
      .post<T[]>(`${this.APIUrl}/list?${params.toString()}`, null)
      .pipe(
        map((list) => list.map((item) => this.toServerModel(item))),
        catchError(this.handleError)
      );
  }

  getListTable(
    columnName: string,
    columnValue: string,
    pageNo: number,
    pageSize: number
  ): Observable<S> {
    let params = new HttpParams()
      .set('searchColumn', columnName.toString())
      .set('searchValue', columnValue.toString())
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());
    const url = `${this.APIUrl}/list?${params.toString()}`;
    return this.httpClient.get<S>(url).pipe(
      map((x) => this.fromListToModel(x)),
      catchError(this.handleError)
    );
  }

  // getListTable(
  //   columnName: string,
  //   columnValue: string,
  //   pageNo: number,
  //   pageSize: number
  // ): Observable<S> {
  //   let params = new HttpParams()
  //     .set('searchColumn', columnName.toString())
  //     .set('searchValue', columnValue.toString())
  //     .set('pageNo', pageNo.toString())
  //     .set('pageSize', pageSize.toString());
  //   return this.httpClient
  //     .get<S>(`${this.APIUrl}/list?${params.toString()}`)
  //     .pipe(
  //       map((list) => this.toServerModel(list))),
  //       catchError(this.handleError)
  //     );
  // }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.APIUrl}/${id}`).pipe(
      map((json) => this.fromServerModel(json)),
      catchError(this.handleError)
    );
  }

  add(resource: T): Observable<any> {
    return this.httpClient
      .post(`${this.APIUrl}`, this.toServerModel(resource))
      .pipe(catchError(this.handleError));
  }

  delete(id: string | number): Observable<any> {
    return this.httpClient
      .delete(`${this.APIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  update(resource: T) {
    return this.httpClient
      .put(`${this.APIUrl}`, this.toServerModel(resource))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError(() => new Error(error.message));
  }
}
