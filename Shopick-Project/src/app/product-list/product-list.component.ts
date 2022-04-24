import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit()  {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }



}
