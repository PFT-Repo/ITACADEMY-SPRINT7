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
  listaJson: any[] = []
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
      this.listaJson[i]= JSON.parse(this.titols[i]);
       i++;
    }
   
  }
  borrar(){
   this.serve.eraseAllPresupost();
   this.serve.listaActive = false;
  }

  ordenAlfa(){
   this.listaJson.sort((a,b)=> a.nombre - b.nombre);
  }
  orderFecha(){
    this.listaJson.sort((a,b)=> a.date - b.date);
  }
  orderReset(){
    this.actualizarLista();
  }
}
