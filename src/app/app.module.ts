import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigurationService } from 'src/service/app-configuration.service';
import { HomeComponent } from 'src/app/home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProvincesComponent } from './master/provinces/provinces.component';
import { ProvinceComponent } from './master/provinces/province/province.component';
import { AppRoutingModule } from './app-routing.module';

const appConfig = (config: AppConfigurationService) => {
  return () => {
    return config.loadConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProvincesComponent,
    ProvinceComponent,
  ],
  imports: [BrowserModule, HttpClientModule,AppRoutingModule],
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
