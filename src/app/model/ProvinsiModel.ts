export interface ProvinsiModel {
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
