import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieOptionsProvider } from '@gorniv/ngx-universal';
import { OcCookieBackendService } from './config/oc-cookie-backend.service';
import { REQUEST } from '@nguniversal/aspnetcore-engine/tokens';

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CookieService,
      useClass: OcCookieBackendService,
      deps: [REQUEST, CookieOptionsProvider],
    },
  ],
})
export class AppServerModule {}
