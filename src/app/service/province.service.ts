import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { ProvinceData, ProvinsiModel } from '../model/ProvinsiModel';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService extends ResourceService<
  ProvinsiModel,
  ProvinceData
> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'api/provinsi';
  }

  override toServerModel(entity: ProvinsiModel): any {
    return {
      ...entity,
    };
  }

  override fromServerModel(json: any): ProvinsiModel {
    return {
      ...json,
    };
  }
}
