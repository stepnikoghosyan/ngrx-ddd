import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

import { UserStore } from './user.store';
import { UserFilterQueryModel } from '@domain/models/user/user-filter-query.model';

@Injectable()
export class UserFacadeService implements OnDestroy {
  public readonly userSearchForm: FormGroup;

  private subscriptions$ = new Subject<void>();

  // TODO: @stepan - read about facades and gut classes in angular
  // TODO: @stepan - component injects facade and formsService, gets data from facade and passes to formsService
  constructor(
    private readonly userStore: UserStore,
    private readonly formBuilder: FormBuilder,
  ) {
    this.userSearchForm = this.initUserSearchForm();
  }

  /** Composite Selectors */
  viewModel$ = this.userStore.viewModel$.pipe(
    map(([usersList, isLoading]) => ({ users: usersList, isLoading })),
  );

  private initUserSearchForm() {
    const form =  this.formBuilder.group({
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
    });

    form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, current) => {
        const { name: prevName, username: prevUsername, phone: prevPhone, email: prevEmail  } = prev;
        const { name: currentName, username: currentUsername, phone: currentPhone, email: currentEmail } = current;

        return prevName?.toLowerCase() === currentName?.toLowerCase() &&
          prevUsername?.toLowerCase() === currentUsername?.toLowerCase() &&
          prevPhone?.toLowerCase() === currentPhone?.toLowerCase() &&
          prevEmail?.toLowerCase() === currentEmail?.toLowerCase();
      }),
      takeUntil(this.subscriptions$)
    ).subscribe({
      next: (filters) => {
        // TODO: CHECK
        console.log('USER SEARCH:', filters);
        this.userStore.setFilters(filters as Partial<UserFilterQueryModel>)
      },
    });

    return form;
  }

  ngOnDestroy() {
    // TODO: CHECK
    console.log('USER FACADE DESTROY');
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
