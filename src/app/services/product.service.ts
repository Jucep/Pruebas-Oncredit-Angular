// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductFactory } from '../factories/product-factory.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  constructor(private productFactory: ProductFactory) {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  addProduct(productData: { name: string; price: number; description: string }): void {
    const product = this.productFactory.createProduct(
      productData.name,
      productData.price,
      productData.description
    );
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }
}