import { PaginationFilterQueryModel } from '@domain/models/pagination/pagination-filter-query.model';

// TODO: REVIEW - can model extend another one ?
// TODO: @stepan - UserQueryModel
export interface UserFilterQueryModel extends PaginationFilterQueryModel {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  pagination: PaginationFilterQueryModel; // TODO: @stepan -
}
