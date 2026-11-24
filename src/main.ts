/**
 * Entry point of the application.
 * Only platform bootstrapping code should be here.
 * For app-specific initialization, use `app/web-app.component.ts`.
 */

import { enableProdMode, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';

import { httpTranslateLoader } from './app/app.module';
import { environment } from './environments/environment';
import { DatePipe, LocationStrategy } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeycloakAngularModule } from 'keycloak-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CoreModule } from './app/core/core.module';
import { HomeModule } from './app/home/home.module';
import { LoginModule } from './app/login/login.module';
import { SettingsModule } from './app/settings/settings.module';
import { SystemModule } from './app/system/system.module';
import { UsersModule } from './app/users/users.module';
import { PaymentHubModule } from './app/payment-hub/paymenthub.module';
import { VouchersModule } from './app/vouchers/vouchers.module';
import { AccountMapperModule } from './app/account-mapper/account-mapper.module';
import { VisualizationsModule } from './app/visualizations/visualizations.module';
import { ConfigurationModule } from './app/configuration/configuration.module';
import { AppRoutingModule } from './app/app-routing.module';
import { WebAppComponent } from './app/web-app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(WebAppComponent, {
    providers: [
        provideZoneChangeDetection(),
        importProvidersFrom(BrowserModule, BrowserAnimationsModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient, locationStrategy: LocationStrategy) => {
                    return new TranslateHttpLoader(http, `${window.location.protocol}//${window.location.host}${locationStrategy.getBaseHref()}assets/translations/`, '.json');
                },
                deps: [HttpClient, LocationStrategy]
            }
        }), KeycloakAngularModule, NgxChartsModule, CoreModule, HomeModule, LoginModule, SettingsModule, SystemModule, UsersModule, PaymentHubModule, VouchersModule, AccountMapperModule, VisualizationsModule, ConfigurationModule, AppRoutingModule),
        DatePipe
    ]
})
  .catch(err => console.log(err));
