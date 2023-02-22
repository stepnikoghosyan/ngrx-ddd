import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { PostModel } from '@domain/models/post/post.model';
import { PostPaginationFilterModel } from '@domain/models/post/post-pagination-filter.model';
import { PostCreatePayloadModel } from '@domain/models/post/post-create-payload.model';
import { PostUpdatePayloadModel } from '@domain/models/post/post-update-payload.model';
import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';

export interface PostRepositoryService {
  getPostById(id: number): Observable<PostModel>;

  getPostsList(filters?: PostPaginationFilterModel): Observable<PaginationResponseModel<PostModel>>;

  createPost(payload: PostCreatePayloadModel): Observable<PostModel>;

  updatePost(payload: PostUpdatePayloadModel): Observable<void>;

  deletePostById(id: number): Observable<void>;
}

export const POST_DATA_PROVIDER_TOKEN = new InjectionToken<() => PostRepositoryService>('app-post-data-service');
