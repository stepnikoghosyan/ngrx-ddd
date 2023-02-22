import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UserRepositoryService } from '@domain/providers/user/user-repository.service';
import { BaseHttpService } from '../../base/http/default-http.service';

import { UserModel } from '@domain/models/user/user.model';
import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';
import { UserFilterQueryModel } from '@domain/models/user/user-filter-query.model';

@Injectable()
export class DefaultUserDataService extends BaseHttpService<UserModel> implements UserRepositoryService {
  constructor(
    http: HttpClient,
  ) {
    super(http, 'users');
  }

  getUserById(id: number): Observable<UserModel> {
    return this.getById({ id });
  }

  getUsersList(filters?: UserFilterQueryModel): Observable<PaginationResponseModel<UserModel>> {
    let paramsWithoutPagination: UserFilterQueryModel | undefined;

    if (filters) {
      const { page, pageSize, showAll, ...rest } = filters;
      paramsWithoutPagination = rest;
    }

    return this.get<UserModel[]>({ params: paramsWithoutPagination })
      .pipe(
        map((response) => {
          if (!filters || !filters.page || !filters.pageSize) {
            return {
              items: response,
              count: response.length,
            };
          }

          return {
            items: response.slice((filters.page - 1) * filters.pageSize, filters.page * filters.pageSize),
            count: response.length,
          };
        }),
      );
  }
}
