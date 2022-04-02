import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  contactForm!:FormGroup 
  categories = [
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
  ];
  

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm=this.fb.group({
      category:[null]
    });
  }
  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }
  
  url="./assets/image-detail/upload-files.jpg";
  onselecrFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
 addForm = new FormGroup({
  productName: new FormControl('Vishwas'),
  pDetail: new FormControl('')
 });

 
 

}
