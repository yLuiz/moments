import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  onRouterLinkActive(event: any) {
    console.log(event)
  }

  setRotaAtiva(event: any) {
    if (event) {
      this.rotaAtiva = true
      console.log(event)
    } else {
      this.rotaAtiva = false
    }
  }

  rotaAtiva: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
