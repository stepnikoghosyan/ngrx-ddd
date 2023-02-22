import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFacadeService } from '../../../data-access/user-facade.service';

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFiltersComponent {
  public readonly form = this.userFacade.userSearchForm;

  constructor(
    private readonly userFacade: UserFacadeService,
  ) {
  }
}
