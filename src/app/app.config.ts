import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ProductService } from './services/product.service';
import { DefaultProductFactory } from './factories/default-product.factory'; 
import { ProductFactory } from './factories/product-factory.interface';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    ProductService,
    { provide: ProductFactory, useClass: DefaultProductFactory },
  ],
};