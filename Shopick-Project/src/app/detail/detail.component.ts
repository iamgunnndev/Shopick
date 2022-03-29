import { Component, OnInit ,HostListener,ElementRef } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private el:ElementRef) { }

  @HostListener('click')
  imageChange(){
    console.log(this.el.nativeElement)
  }
  ngOnInit(): void {
  }

}
