import { Injectable, EventEmitter } from '@angular/core';
import { presupostI } from '../interfaces/presupost-i';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  constructor() { }
  listaActive:boolean = false;
  x:number =1;
  web=false;
  list: any[]=[]
  seo=false;
  ads=false;
  name:string='' ;
  client: string | undefined;
  langUpdated = new EventEmitter();
  listUpdate = new EventEmitter();
  private plata: any[] = [0, 0, 0, 0, 0, 0,'',''];
  private presupost:presupostI[]=[];
  i:number=1;
  getTotal() {
    let upd = this.plata.slice(0, 3)
    let res = upd.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    let y = this.plata[4]
    let u = this.plata[5]
    let w = y * u * 30;
    return res + w;
  }
  getPag():string{
    let b = this.plata[4];
    return b.toString();
  }
  getIdi():string{
    let b = this.plata[5];
    return b.toString();
  }

  addPrice(index: number, number: number) {

    this.plata.splice(index, 1, number);
    this.langUpdated.emit(this.plata);
  }
  getppt() {
    let y = this.plata[4]
    let u = this.plata[5]
    return y + u;
  }
  addToList(p:presupostI){
    this.presupost.push(p)
    localStorage.setItem('list'+this.i,JSON.stringify(p))
    console.log(this.i);
    
    this.i++;
  }
  pushClient(s:string):void{
    this.plata.splice(6,1,s);
  }
  pushProyect(s:string):void{
    this.plata.splice(7,1,s);
  }
getData():presupostI{
  if(this.plata[4]== 0||this.plata[5]== 0){
    this.web=false
  }
  let ppt:presupostI={nombre: this.plata[7] ,cliente: this.plata[6], web: this.web,
    seo:this.seo,
    ads:this.ads,
    npgs:this.plata[4],
    nid:this.plata[5],
    date: new Date(),
    valor:this.getTotal()
  }
  return ppt;
}
getAllPresupost(){
  let x =1
  while(x<this.i){
    this.list[x-1]=localStorage.getItem('list'+x);
  x++;
  }
  console.log(this.list);
  this.listUpdate.emit(this.list);
  return this.list;
}
eraseAllPresupost(){
 let x=1;
  while(this.i>0){
    localStorage.removeItem('list'+x);
    x++;
    this.i--;
  }
  this.list = [];
  this.i=1
  localStorage.clear();
  localStorage.clear();
}
}
