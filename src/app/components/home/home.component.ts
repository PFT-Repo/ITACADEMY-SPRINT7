import { Component, OnInit } from '@angular/core';
import { TotalAmountService } from 'src/app/total-amount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  preuFinal:number = 0;
  realFinal:number= this.serve.getTotal();
  activePanel = false;
  constructor(private serve:TotalAmountService) { 
  }

  ngOnInit() {
    this.serve.langUpdated.subscribe(
      () => {
        this.realFinal= this.serve.getTotal();
      }
    );
  }
  checker(id: string) {
    let checkbox = document.getElementById(
      id,
    ) as HTMLInputElement | null;
    if (checkbox) {
      
      let valor = parseInt(checkbox.value);
      if (checkbox?.checked) {
        if(id == 'paginaWebCheck'){
         this.activePanel=true;
      }
        this.preuFinal += valor;
        this.sendPrices(valor)
        this.realFinal = this.serve.getTotal();
      } else {
        if(id == 'paginaWebCheck'){
          this.activePanel=false;
       }
       this.sendPrices(valor*-1);
        this.preuFinal -= valor;
        this.realFinal = this.serve.getTotal();
      }
    }
  }
  sendPrices(number:number){
    console.log("enviando "+number)
    this.serve.addPrice(number);
  }
  submit() {

    console.log(this.preuFinal);
  }
}
