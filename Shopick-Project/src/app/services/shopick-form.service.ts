import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ShopickFormService {

  
  private categoryURL ='http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getCategory(): Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseCategories>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    
    // build an array for "Month" dropdown list
    // - start at current month and loop until 

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years
    
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  

}

interface GetResponseCategories{
  _embedded:{
    productCategory: ProductCategory[];
  }
}