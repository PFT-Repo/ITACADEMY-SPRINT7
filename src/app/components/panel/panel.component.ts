import { Component, OnInit } from '@angular/core';
import { TotalAmountService } from 'src/app/services/total-amount.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private serve: TotalAmountService, private preu:HomeComponent) { }
  numPag: number = 1;
  numIdio: number = 1;
  ngOnInit(): void {
    this.sendPrice(4, this.numPag);
    this.sendPrice(5, this.numIdio);
  }
  //pPT = this.serve.getppt() * 30;

  sumaPag() {
    this.numPag += 1;
    this.sendPrice(4, this.numPag);
  }
  sumaIdio() {
    this.numIdio += 1;
    this.sendPrice(5, this.numIdio);
  }
  restaPag() {
    this.numPag -= 1; 
    this.sendPrice(4, this.numPag);
    if (this.numPag < 1) { this.numPag = 1 
      this.sendPrice(4, 1);}
  }
  restaIdio() {
    this.numIdio -= 1; 
    this.sendPrice(5, this.numIdio);
    if (this.numIdio < 1) { this.numIdio = 1
      this.sendPrice(5, 1); }
  }

  sendPrice(index: number, number: number) {
    this.serve.addPrice(index, number);
    this.serve.addPrice(index, number);
  }

}
