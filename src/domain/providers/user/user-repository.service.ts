import { InjectionToken } from '@angular/core';
import { PaginationFilterQueryModel } from '@domain/models/pagination/pagination-filter-query.model';
import { Observable } from 'rxjs';
import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';
import { UserModel } from '@domain/models/user/user.model';

// TODO: @stepan - user.repository.ts instead of service

export interface UserRepositoryService {
  getUserById(id: number): Observable<UserModel>;

  getUsersList(filters?: PaginationFilterQueryModel): Observable<PaginationResponseModel<UserModel>>;
}

export const USER_DATA_PROVIDER_TOKEN = new InjectionToken<UserRepositoryService>('app-user-data-service');
