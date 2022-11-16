import { Component, OnInit } from '@angular/core';
import { TotalAmountService } from 'src/app/total-amount.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private serve : TotalAmountService) { }
  numPag: number = 1;
  numIdio: number = 1;
  ngOnInit(): void {
    this.sendPrice(this.pPT);
  }
  pPT= this.numPag * this.numIdio* 30;

  sumaPag() {
    this.numPag += 1;
    this.sendPrice(this.pPT);
    console.log(this.pPT);
    console.log("suma");
  }
  sumaIdio() {
    this.numIdio += 1;
    this.sendPrice(this.pPT);
    console.log("suma");
  }
  restaPag() {
    this.sendPrice(this.pPT*-1);
    this.numPag -= 1;
    if(this.numPag<1){this.numPag=1}
    this.sendPrice(this.pPT);
    console.log("resta");
  }
  restaIdio() {
    this.sendPrice(this.pPT*-1);
    this.numIdio -= 1;
    if(this.numIdio<1){this.numIdio=1}
    this.sendPrice(this.pPT);
    console.log("resta");
  }

  sendPrice(number:number){
    console.log("añadiendo " +number)
    this.serve.addPrice(number)
  }

}
