import { Product } from '../models/product.model';

export abstract class ProductFactory {
  abstract createProduct(name: string, price: number, description: string): Product;
}