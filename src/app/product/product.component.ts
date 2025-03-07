// src/app/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { HighlightDirective } from '../directives/highlight.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HighlightDirective],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  isEditing = false;
  currentProductId: number | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;

    if (this.isEditing && this.currentProductId !== null) {
      const updatedProduct: Product = { ...productData, id: this.currentProductId };
      this.productService.updateProduct(updatedProduct);
    } else {
      this.productService.addProduct(productData);
    }

    this.resetForm();
    this.loadProducts();
  }

  onEdit(product: Product): void {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset();
  }
}