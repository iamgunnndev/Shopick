import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopick-Project';
  router: any;
  
  onSubmit(){
    this.router.navigateByUrl(['/cart'])
  }
}
