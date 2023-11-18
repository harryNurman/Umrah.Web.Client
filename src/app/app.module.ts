import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigurationService } from 'src/service/app-configuration.service';

const appConfig = (config: AppConfigurationService) => {
  return () => {
    return config.loadConfig();
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    AppConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [AppConfigurationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
