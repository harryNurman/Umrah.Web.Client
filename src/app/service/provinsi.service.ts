import { Injectable } from '@angular/core';
import { ProvinsiModel } from '../model/ProvinsiModel';
import { AppConfiguration } from 'src/config/app-configuration';
import { AppConfigurationService } from './app-configuration.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProvinsiService {
  appConfig?: AppConfiguration;
  configService: AppConfigurationService;

  constructor(
    private http: HttpClient,
    appConfigService: AppConfigurationService
  ) {
    this.configService = appConfigService;
    this.appConfig = this.configService.getConfig();
  }

  public getProvinces() {
    let url = this.appConfig?.baseUrl + 'api/Provinsi';
    //console.log(url);
    return this.http.get<[ProvinsiModel]>(url).pipe(
      map((response) => {
        let provinces: ProvinsiModel[] = [];
        //console.log(response);
        for (let id in response) {
          provinces.push(response[id]);
        }
        //console.log(provinces);
        return provinces;
      })
    );
  }

  public postProvince(postdata: ProvinsiModel) {
    return this.http.post<ProvinsiModel>(
      this.appConfig?.baseUrl + 'api/Provinsi',
      postdata
    );
  }
}
