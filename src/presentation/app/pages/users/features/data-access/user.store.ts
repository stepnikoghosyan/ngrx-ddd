import { Inject, Injectable } from '@angular/core';

import { combineLatest, Observable, switchMap, tap } from 'rxjs';

import { ComponentStore, tapResponse } from '@ngrx/component-store';

import { USER_DATA_PROVIDER_TOKEN, UserRepositoryService } from '@domain/providers/user/user-repository.service';

import { UserModel } from '@domain/models/user/user.model';
import { UserFilterQueryModel } from '@domain/models/user/user-filter-query.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface UsersState {
  users: UserModel[];
  isLoading: boolean;
  filters?: UserFilterQueryModel;
}

const initialState: UsersState = {
  users: [],
  isLoading: true,
  filters: {
    page: 1,
    pageSize: 10,
  },
};

@Injectable()
export class UserStore extends ComponentStore<UsersState> {
  constructor(
    @Inject(USER_DATA_PROVIDER_TOKEN) private readonly userRepository: UserRepositoryService,
  ) {
    super(initialState);

    this.getUsersList(this.filters$);

    console.log('store init');
  }

  /** Selectors */
  readonly usersList$ = this.select((state) => state.users);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly filters$ = this.select((state) => state.filters);

  /** Composite Selectors */
  viewModel$ = combineLatest([
    this.usersList$,
    this.isLoading$,
    this.filters$,
  ]);

  /** Updaters */
  readonly setUsersList = this.updater<UserModel[]>((state, users) => ({
    ...state,
    users,
  }));
  readonly setIsLoading = this.updater<boolean>((state, isLoading) => ({
    ...state,
    isLoading,
  }));
  readonly setFilters = this.updater<Partial<UserFilterQueryModel>>(
    (state, filters) => ({
      ...state,
      filters: !!filters && Object.keys(filters).length && { ...state.filters, ...filters } || initialState.filters,
    })
  );

  /** Effects */
  readonly getUsersList = this.effect<number, Observable<UserFilterQueryModel | undefined>>((filters$) => {
    return filters$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((filters) => this.userRepository.getUsersList(filters)),
      tapResponse(
        (response) => {
          this.setUsersList(response.items);
          this.setIsLoading(false);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.setIsLoading(false);
        }
      ),
    );
  });
}
