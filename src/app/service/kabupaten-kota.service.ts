import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import {
  KabuapatenKotaData,
  KabupatenKotaModel,
} from '../model/KabupatenKotaModel';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KabupatenKotaService extends ResourceService<
  KabupatenKotaModel,
  KabuapatenKotaData
> {
  override getResourceUrl(): string {
    return 'api/kabupatenkota';
  }

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  override toServerModel(entity: KabupatenKotaModel): any {
    return {
      ...entity,
    };
  }

  override fromServerModel(json: any): KabupatenKotaModel {
    return {
      ...json,
    };
  }
}
