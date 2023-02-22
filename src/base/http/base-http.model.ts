import { Observable } from 'rxjs';

import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';
import { PaginationFilterQueryModel } from '@domain/models/pagination/pagination-filter-query.model';

export interface BaseHttpModel<T> {
  getById(input: { id: number, overrideEndpoint?: string }): Observable<T>;

  getByPagination(input?: {
    filters?: PaginationFilterQueryModel,
    overrideEndpoint?: string,
  }): Observable<PaginationResponseModel<T>>;

  getAll(input?: {
    filters?: { [key: string]: any },
    overrideEndpoint?: string,
  }): Observable<PaginationResponseModel<T>>;

  post<PayloadType = unknown, ResponseType = T>(input: {
    payload: PayloadType,
    overrideEndpoint?: string,
  }): Observable<ResponseType>;

  put<PayloadType, ResponseType = T>(input: {
    payload: PayloadType,
    overrideEndpoint?: string,
  }): Observable<ResponseType>;

  deleteById<ResponseType = void>(input: {
    id: number,
    overrideEndpoint?: string,
  }): Observable<ResponseType>;
}
