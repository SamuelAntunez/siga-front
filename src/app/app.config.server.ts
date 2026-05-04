import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
