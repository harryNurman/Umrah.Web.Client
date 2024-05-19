export class ProvinsiModel {
  /**
   *
   */
  public constructor(init?: Partial<ProvinsiModel>) {
    Object.assign(this, init);
  }
  Id: number;
  Code: string;
  Name: string;
  TimeZoneInfo: string;
  CreatedAt: Date;
}

export interface ProvinceData {
  Data: ProvinsiModel[];
  Page: number;
  PageSize: number;
  TotalRows: number;
  TotalPages: number;
}
