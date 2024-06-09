import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppConfigurationService } from 'src/app/service/app-configuration.service';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { MasterModule } from './master/master.module';
import { PublicModule } from './public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MaterialModule } from './shared/material.module';

const appConfig = (config: AppConfigurationService) => {
  return () => {
    return config.loadConfig();
  };
};

@NgModule({ declarations: [AppComponent, ErrorComponent, MenuBarComponent],
    exports: [],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        MasterModule,
        PublicModule,
        BrowserAnimationsModule,
        SharedModule,
        MaterialModule], providers: [
        AppConfigurationService,
        {
            provide: APP_INITIALIZER,
            useFactory: appConfig,
            multi: true,
            deps: [AppConfigurationService],
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
