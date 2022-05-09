import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '../common/product';
import { ShopickService } from '../shopick.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  products:Product=new Product();

  /*categories = [
    { id: 1, name: "men's clothing" },
    { id: 2, name: "women's clothing" },
    { id: 3, name: "Mobile and accessories" },
    { id: 4, name: "beauty and personal care" },
    { id: 5, name: "men's shoes" },
    { id: 6, name: "women's shoes" },
    { id: 7, name: "computers and laptops" },
    { id: 8, name: "bag" },
    { id: 9, name: "food and drink" },
    { id: 10, name: "home appliances" }
  ];*/
  
  CagetoriesList:any;
  SelectesValue:any;

  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse?: string ;
  image: any;

  

  constructor(private fb:FormBuilder,private httpClient: HttpClient,
      private service:ShopickService) { }

  ngOnInit(): void {
    

    this.service.getCagetory().subscribe((data:any)=>
    this.CagetoriesList=data)
  }
  
 
 //------ upload image ------
 public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }
 imageUploadAction() {
  const imageFormData = new FormData();
  imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


  this.httpClient.post('http://localhost:8080/upload/image', imageFormData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.postResponse = response;
        this.successResponse = this.postResponse.body.message;
      } else {
        this.successResponse = 'Image not uploaded due to some error!';
      }
    }
    );
  }

viewImage() {
  this.httpClient.get('http://localhost:8080/get/image/info/' + this.image)
    .subscribe(
      res => {
        this.postResponse = res;
        this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
      }
    );
}

//------- cagetory --------

ChangeCagetory(e:any){
  console.log(e.target.value);
  this.SelectesValue=e.target.value;
}


//------- submit --------
saveProduct(){
  this.service.UploadProduct(this.products).subscribe(data =>{
    console.log(data);
  })
}

onSubmit(){
  this.saveProduct();
  //this.imageUploadAction();
}



 
 

}
