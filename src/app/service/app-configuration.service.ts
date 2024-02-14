import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/config/app-configuration';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppConfigurationService {
  private appConfig: any;
  constructor(private http: HttpClient) {}

  //this function needs to return promise
  public async loadConfig() {
    const get$ = this.http.get('../assets/app.config.json');
    const res1 = await lastValueFrom(get$);
    this.appConfig = res1;

    // // toPromise is obsolete
    // return this.http
    //   .get<AppConfiguration>('../assets/app.config.json')
    //   .toPromise()
    //   .then((res) => {
    //     this.appConfig = res;
    //   })
    //   .catch(() => {
    //     console.error("Can't load configuration");
    //   });
  }

  public getConfig() {
    return this.appConfig;
  }
}
