import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseHttpModel } from './base-http.model';
import { PaginationFilterQueryModel } from '@domain/models/pagination/pagination-filter-query.model';
import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';

import { anyToHttpParams } from '@domain/utils/any-to-http-params.helper';

export abstract class BaseHttpService<Model> implements BaseHttpModel<Model> {
  protected readonly BASE_API_ENDPOINT: string = environment.BASE_API_ENDPOINT;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly ENDPOINT: string,
  ) {
  }

  public get<T = Model>(input?: { params?: {[key: string]: any}, overrideEndpoint?: string }): Observable<T> {
    return this.http.get<T>(
      `${this.BASE_API_ENDPOINT}${input?.overrideEndpoint || this.ENDPOINT}/`,
      { params: anyToHttpParams(input?.params) },
    );
  }

  public getById(input: { id: number, overrideEndpoint?: string }): Observable<Model> {
    return this.http.get<Model>(`${this.BASE_API_ENDPOINT}${input.overrideEndpoint || this.ENDPOINT}/${input.id}/`);
  }

  public getByPagination(input?: {
    filters?: PaginationFilterQueryModel,
    overrideEndpoint?: string,
  }): Observable<PaginationResponseModel<Model>> {
    return this.http.get<PaginationResponseModel<Model>>(
      `${this.BASE_API_ENDPOINT}${input?.overrideEndpoint || this.ENDPOINT}`,
      { params: anyToHttpParams(input?.filters) },
    );
  }

  getAll(input?: {
    filters?: { [p: string]: any };
    overrideEndpoint?: string
  }): Observable<PaginationResponseModel<Model>> {
    return this.http.get<PaginationResponseModel<Model>>(
      `${this.BASE_API_ENDPOINT}/${input?.overrideEndpoint || this.ENDPOINT}/`,
      {
        params: anyToHttpParams({ ...input?.filters, all: true }),
      }
    );
  }

  post<PayloadType = unknown, ResponseType = Model>(input: {
    payload: PayloadType;
    overrideEndpoint?: string
  }): Observable<ResponseType> {
    return this.http.post<ResponseType>(
      `${this.BASE_API_ENDPOINT}/${input.overrideEndpoint || this.ENDPOINT}/`,
      input.payload
    );
  }

  put<PayloadType, ResponseType = Model>(input: {
    payload: PayloadType;
    overrideEndpoint?: string
  }): Observable<ResponseType> {
    return this.http.put<ResponseType>(
      `${this.BASE_API_ENDPOINT}/${input.overrideEndpoint || this.ENDPOINT}/`
      ,
      input.payload
    );

  }

  deleteById<ResponseType = void>(input: { id: number; overrideEndpoint?: string }): Observable<ResponseType> {
    return this.http.delete<ResponseType>(`${this.BASE_API_ENDPOINT}/${input.overrideEndpoint || this.ENDPOINT}/${input.id}/`);
  }
}
