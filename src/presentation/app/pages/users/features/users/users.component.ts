import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserFacadeService } from '../data-access/user-facade.service';
import { tap } from 'rxjs';

@Component({
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  // TODO: @stepan - add containers folder for components
  vm$ = this.userFacade.viewModel$.pipe(
    tap((values) => console.log('VM CHANGE:', values)),
  );

  constructor(
    private readonly userFacade: UserFacadeService,
  ) {
  }
}
