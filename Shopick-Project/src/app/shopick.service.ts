import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './common/product';

@Injectable({
  providedIn: 'root'
})
export class ShopickService {

  baseURL1 = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  UploadProduct(products:Product): Observable<Object>{
    return this.httpClient.post(`${this.baseURL1}/uploadProduct`,products);
  }

  getCagetory(){
    return this.httpClient.get<any>(`${this.baseURL1}/getCagetories`);
  }
}
