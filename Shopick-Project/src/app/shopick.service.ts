import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './DbModelTan/Cagetory';
import { Product } from './DbModelTan/Product';
@Injectable({
  providedIn: 'root'
})
export class ShopickService {

  private baseURL1= "http://localhost:8080";
  private baseURL2= "http://localhost:8080/shopick";

  constructor(private httpClient: HttpClient) { }

  UploadProduct(products:Product): Observable<Object>{
    return this.httpClient.post(`${this.baseURL1}/uploadProduct`,products);
  }

  getCagetory(){
    return this.httpClient.get<any>(`${this.baseURL1}/getCagetories`);
  }
  
}
