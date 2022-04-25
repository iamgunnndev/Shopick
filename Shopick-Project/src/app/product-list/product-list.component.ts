import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  currentCategoryid!: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit()  {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
}
listProducts(){
  // check if "id" parameter is available
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryid = +this.route.snapshot.paramMap.getAll('id');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryid = 1;
    }

    this.productService.getProductList(this.currentCategoryid).subscribe(
      data => {
        this.products = data;
      }
    )
  }



}
