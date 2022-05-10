import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { ShopickFormService } from '../services/shopick-form.service';
import { ShopickService } from '../shopick.service';
import { ShopickValidators } from '../validators/shopick-validators';

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
  
  categories: ProductCategory[]=[];

  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse?: string ;
  image: any;

  uploadFormGroup!: FormGroup;

  constructor(private httpClient: HttpClient,
    private service:ShopickFormService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  
    this.service.getCategory().subscribe(
      data =>{
        console.log("Retrieved categories: "+ JSON.stringify(data));
        this.categories = data;
      }
    );

    this.uploadFormGroup = this.formBuilder.group({
      addProduct: this.formBuilder.group({
        name: new FormControl('',
                    [Validators.required, 
                    Validators.minLength(2), 
                    ShopickValidators.notOnlyWhitespace]),
        description: new FormControl('',
                    [Validators.required, 
                    Validators.minLength(2), 
                    ShopickValidators.notOnlyWhitespace]),
        unit_price: new FormControl('',
                    [Validators.required]),
        image_url: new FormControl(''),
        units_in_stock: new FormControl('',
                    [Validators.required]),
        category_id: new FormControl('',
                    [Validators.required, 
                    ShopickValidators.notOnlyWhitespace])
      })
  });
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
  
}


//------- submit --------


onSubmit(){
  if(this.uploadFormGroup.invalid){
    this.uploadFormGroup.markAllAsTouched();
  }
}

 get name() {return this.uploadFormGroup .get('addProduct.name');}
 get description() {return this.uploadFormGroup .get('addProduct.description');}
 get price() {return this.uploadFormGroup .get('addProduct.unit_price');}
 get image_url() {return this.uploadFormGroup .get('addProduct.image_url');}
 get iventory() {return this.uploadFormGroup .get('addProduct.units_in_stock');}
 get category() {return this.uploadFormGroup .get('addProduct.category_id');}

 
 

}
