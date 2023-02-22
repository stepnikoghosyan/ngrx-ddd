import { PaginationFilterQueryModel } from '@domain/models/pagination/pagination-filter-query.model';

export interface PostPaginationFilterModel extends PaginationFilterQueryModel {
  userId?: number;
  title?: string;
}
