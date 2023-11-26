import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from 'src/config/app-configuration';
import { AppConfigurationService } from 'src/service/app-configuration.service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title?: string;
  baseUrl?: string;
  appConfig?: AppConfiguration;
  configService: AppConfigurationService;

  constructor(appConfigService: AppConfigurationService) {
    this.configService = appConfigService;
  }
  ngOnInit() {
    this.appConfig = this.configService.getConfig();
    this.title = this.appConfig?.title;
    console.log(this.appConfig);
  }
}
