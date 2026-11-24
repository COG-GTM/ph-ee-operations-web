/** Angular Imports */
import { NgModule, inject } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

/** Translation Imports */
import { TranslateModule } from '@ngx-translate/core';

/** Custom Services */
import { AuthenticationService } from './authentication/authentication.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ProgressBarService } from './progress-bar/progress-bar.service';
import { I18nService } from './i18n/i18n.service';

/** Custom Guards */

/** Custom Interceptors */
import { progressInterceptor } from './progress-bar/progress.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { authenticationInterceptor } from './authentication/authentication.interceptor';

/** Custom Strategies */
import { RouteReusableStrategy } from './route/route-reusable-strategy';

/** Custom Modules */
import { SharedModule } from '../shared/shared.module';


/** Custom Components */
import { ShellComponent } from './shell/shell.component';
import { SidenavComponent } from './shell/sidenav/sidenav.component';
import { ToolbarComponent } from './shell/toolbar/toolbar.component';
import { ContentComponent } from './shell/content/content.component';

/**
 * Core Module
 *
 * Main app shell components and singleton services should be here.
 */
@NgModule({
    exports: [
        SharedModule // TO BE REMOVED: Once all components have replaced the core module import by shared module.
    ], imports: [SharedModule,
    TranslateModule,
    RouterModule,
    ShellComponent,
    SidenavComponent,
    ToolbarComponent,
    ContentComponent], providers: [
        // Must precede the HttpClient -> HttpService override below.
        provideHttpClient(withInterceptors([authenticationInterceptor, progressInterceptor]), withInterceptorsFromDi()),
        AuthenticationService,
        I18nService,
        HttpCacheService,
        ErrorHandlerInterceptor,
        CacheInterceptor,
        {
            provide: HttpClient,
            useClass: HttpService
        },
        ProgressBarService,
        {
            provide: RouteReuseStrategy,
            useClass: RouteReusableStrategy
        }
    ] })
export class CoreModule {

  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true });

    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
