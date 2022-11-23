import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { presupostI } from 'src/app/interfaces/presupost-i';
import { TotalAmountService } from 'src/app/services/total-amount.service';

@Component({
  selector: 'app-presupuestos-list',
  templateUrl: './presupuestos-list.component.html',
  styleUrls: ['./presupuestos-list.component.scss']
})
export class PresupuestosListComponent implements OnInit, OnChanges {

  @Input() first:boolean = true;
  @Input() titols: any[] = []
  listDefault = true;
  listAlfa = false;
  listDate = false;
  listSearch=false;
  listaJson: any[] = []
  listfiltreda: any[] = []
  listfiltredb: any[] = []
  listfiltredc: any[] = []
  listfiltredd: any[] = []
  constructor(private serve: TotalAmountService) { }

  ngOnInit(): void {  
    this.serve.listUpdate.subscribe(
      () => {
        this.actualizarLista();
      }
    );
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.actualizarLista();
  }

  actualizarLista(){
    let i = 0;

    while(i < this.titols.length){
      this.listfiltreda[i]= JSON.parse(this.titols[i]);
       i++;
    }
   this.listaJson=this.listfiltreda;
  }
  borrar(){
   this.serve.eraseAllPresupost();
   this.serve.listaActive = false;
  }
  compareName( a:any , b:any  ) {
    if ( a.nombre < b.nombre ){
      return -1;
    }
    if ( a.nombre > b.nombre ){
      return 1;
    }
    return 0;
  }
  compareFecha( a:any , b:any  ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }
  
  ordenAlfa(){
    this.listDefault = false;
    this.listAlfa = true;
    this.listDate= false
    this.listSearch = false;
   this.listfiltredb = this.listfiltreda.sort(this.compareName);
  }
  orderFecha(){
    this.listDefault = false;
    this.listAlfa = false;
    this.listDate= true
    this.listSearch = false;
    this.listfiltredc=this.listfiltreda.sort(this.compareFecha);    
  }
  search(){
    let h= <HTMLInputElement> document.getElementById('searchInput');

    this.listDefault = false;
    this.listAlfa = false;
    this.listDate= false;
    this.listSearch = true;
    let y =this.listfiltreda.filter(array => array.nombre == h.value);
    if(y[0]==null){
      alert("no hay presupuestos con ese nombre");
      this.listfiltredd = this.listfiltreda;
    }
    else{
      this.listfiltredd = y;
    }   
  }
  orderReset(){
    this.listDefault = true;
    this.listAlfa = false;
    this.listDate= false;
    this.listSearch = false;
    this.actualizarLista();
  }
}
