import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { presupostI } from 'src/app/interfaces/presupost-i';
import { TotalAmountService } from 'src/app/services/total-amount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges{
  preuFinal:number = 0;
  in:number = 0;
  listActive:boolean=false;
  realFinal:number=0;
  u= this.serve.getAllPresupost(); 
  ppt:presupostI={ web:false,
    seo:false,
    ads:false,
    npgs:0,
    nid:0}

    webs:string|null= String(this.ppt.web);
  activePanel = false;
  preciofinal = document.getElementById('precioPublico');
  constructor(private serve:TotalAmountService, private route: ActivatedRoute) { 
    this.realFinal= this.serve.getTotal();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.realFinal= this.serve.getTotal();
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    console.log("---------------------------------"+this.webs+"------------------------------------")
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.webs = params.get('web');
    });

    this.serve.langUpdated.subscribe(
      () => {
       this.updateReal();
      }
    );
      if (this.u[0] != null){
        console.log(this.u);
        this.listActive=true;
      }
  }

  ngOnChange(){
       this.updateReal();
  }
  updateReal(){
    this.realFinal= this.serve.getTotal();
  }
  checker(id: string) {
    let checkbox = document.getElementById(
      id,
    ) as HTMLInputElement | null;
    if (checkbox) {
      if(id=='paginaWebCheck'){this.in = 0; this.serve.web=true}
      if(id=='consultoriaCheck'){this.in = 1; this.serve.seo=true}
      if(id=='googleAdsCheck'){this.in = 2; this.serve.ads=true}
      let valor = parseInt(checkbox.value);
      if (checkbox?.checked) {
        if(id == 'paginaWebCheck'){ 
         this.activePanel=true;
         // setTimeout(() => this.updateReal(),1);
      } 

        this.preuFinal += valor;
        this.sendPrices(this.in,valor)
        this.updateReal();
      
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
    let w:presupostI = this.serve.getData();
    this.serve.addToList(w);
    this.listActive=true;
    console.log(this.preuFinal);
  }
}
