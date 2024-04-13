export interface KabupatenKotaModel {
  Id: number;
  Code: string;
  Name: string;
  ProvinceCode: string;
  ProvinceName: string;
}

export interface KabuapatenKotaData {
  Data: KabupatenKotaModel[];
  Page: number;
  PageSize: number;
  TotalRows: number;
  TotalPages: number;
}
