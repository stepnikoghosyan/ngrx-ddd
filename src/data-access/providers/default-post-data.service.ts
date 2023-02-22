import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PostRepositoryService } from '@domain/providers/post/post-repository.service';
import { BaseHttpService } from '../../base/http/default-http.service';

import { PostModel } from '@domain/models/post/post.model';
import { PostPaginationFilterModel } from '@domain/models/post/post-pagination-filter.model';
import { PaginationResponseModel } from '@domain/models/pagination/pagination-response.model';
import { PostCreatePayloadModel } from '@domain/models/post/post-create-payload.model';
import { PostUpdatePayloadModel } from '@domain/models/post/post-update-payload.model';

@Injectable()
export class DefaultPostDataService extends BaseHttpService<PostModel> implements PostRepositoryService {

  constructor(http: HttpClient) {
    super(http, 'posts');
  }

  getPostById(id: number): Observable<PostModel> {
    return this.getById({ id });
  }

  getPostsList(filters?: PostPaginationFilterModel): Observable<PaginationResponseModel<PostModel>> {
    return this.getByPagination({ filters });
  }

  createPost(payload: PostCreatePayloadModel): Observable<PostModel> {
    return this.post<PostCreatePayloadModel, PostModel>({ payload });
  }

  updatePost(payload: PostUpdatePayloadModel): Observable<void> {
    return this.put<PostUpdatePayloadModel, void>({ payload });
  }

  deletePostById(id: number): Observable<void> {
    return this.deleteById({ id });
  }
}
