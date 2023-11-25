import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigurationService } from 'src/service/app-configuration.service';
import { HomeComponent } from 'src/app/home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { MasterModule } from './master/master.module';

const appConfig = (config: AppConfigurationService) => {
  return () => {
    return config.loadConfig();
  };
};

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, MasterModule],
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
