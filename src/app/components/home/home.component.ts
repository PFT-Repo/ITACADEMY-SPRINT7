import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TotalAmountService } from 'src/app/total-amount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges{
  preuFinal:number = 0;
  in:number = 0;
  realFinal:number= this.serve.getTotal();
  activePanel = false;
  preciofinal = document.getElementById('precioPublico');
  constructor(private serve:TotalAmountService) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.realFinal= this.serve.getTotal();
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.serve.langUpdated.subscribe(
      () => {
        this.realFinal= this.serve.getTotal();
      }
    );
  }
  ngAfterViewInit(){
    this.realFinal= this.serve.getTotal();
  }
  checker(id: string) {
    let checkbox = document.getElementById(
      id,
    ) as HTMLInputElement | null;
    if (checkbox) {
      if(id=='paginaWebCheck'){this.in = 0}
      if(id=='consultoriaCheck'){this.in = 1}
      if(id=='googleAdsCheck'){this.in = 2}
      let valor = parseInt(checkbox.value);
      if (checkbox?.checked) {
        if(id == 'paginaWebCheck'){
         this.activePanel=true;
         this.realFinal= this.serve.getTotal();
         if(this.preciofinal){this.preciofinal.innerText="Preu: {{realFinal}}";}
         
      }
        this.preuFinal += valor;
        this.sendPrices(this.in,valor)
        this.realFinal = this.serve.getTotal();
      } else {
        if(id == 'paginaWebCheck'){
          this.activePanel=false;
          this.sendPrices(4,0);
          this.sendPrices(5,0);
          this.realFinal= this.serve.getTotal();
       }
       this.sendPrices(this.in,0);
        this.preuFinal -= valor;
        this.realFinal = this.serve.getTotal();
      }
    }
  }
  sendPrices(index:number,number:number){
    console.log("enviando "+number)
    this.serve.addPrice(index,number);
  }
  submit() {

    console.log(this.preuFinal);
  }
}
