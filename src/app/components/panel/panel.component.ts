import { Component, OnInit } from '@angular/core';
import { TotalAmountService } from 'src/app/total-amount.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(private serve: TotalAmountService) { }
  numPag: number = 1;
  numIdio: number = 1;
  ngOnInit(): void {
    this.sendPrice(4, this.numPag);
    this.sendPrice(5, this.numIdio);
  }
  pPT = this.serve.getppt() * 30;

  sumaPag() {
    this.numPag += 1;
    this.sendPrice(4, this.numPag);
  }
  sumaIdio() {
    this.numIdio += 1;
    this.sendPrice(5, this.numIdio);
  }
  restaPag() {
    this.sendPrice(4, this.numPag);
    this.numPag -= 1;
    if (this.numPag < 1) { this.numPag = 1 }
  }
  restaIdio() {
    this.sendPrice(5, this.numIdio);
    this.numIdio -= 1;
    if (this.numIdio < 1) { this.numIdio = 1 }
  }

  sendPrice(index: number, number: number) {
    this.serve.addPrice(index, number)
  }

}
