// src/app/factories/default-product.factory.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductFactory } from './product-factory.interface';

@Injectable({
  providedIn: 'root', // Proporciona el factory a nivel de aplicación
})
export class DefaultProductFactory implements ProductFactory {
  private lastId = 0;

  createProduct(name: string, price: number, description: string): Product {
    return {
      id: ++this.lastId, // Genera un ID único
      name,
      price,
      description,
    };
  }
}