import { NgModule } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersRoutingModule } from './users-routing.module';


import { USER_DATA_PROVIDER_TOKEN } from '@domain/providers/user/user-repository.service';
import { DefaultUserDataService } from '@data-access/providers/default-user-data.service';
import { UserFacadeService } from '../data-access/user-facade.service';

import { UsersComponent } from './users.component';
import { UserStore } from '../data-access/user.store';
import { UserFiltersComponent } from './components/user-filters/user-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, UserFiltersComponent],
  imports: [
    UsersRoutingModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: USER_DATA_PROVIDER_TOKEN, useClass: DefaultUserDataService },
    UserStore,
    UserFacadeService,
  ],
})
export class UsersModule {
}
