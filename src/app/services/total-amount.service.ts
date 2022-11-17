import { Injectable, EventEmitter } from '@angular/core';
import { presupostI } from '../interfaces/presupost-i';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  constructor() { }
  web=false;
  seo=false;
  ads=false;

  langUpdated = new EventEmitter();
  private plata: number[] = [0, 0, 0, 0, 0, 0];
  private presupost:presupostI[]=[];
  i:number=1;
  getTotal() {
    console.log("funcionó hasta acá");
    console.log(this.plata);
    let upd = this.plata.slice(0, 3)
    let res = upd.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    let y = this.plata[4]
    console.log(this.plata[4])
    let u = this.plata[5]
    console.log(this.plata[5])
    let w = y * u * 30;
    console.log(w);

    return res + w;
  }

  addPrice(index: number, number: number) {

    this.plata.splice(index, 1, number);
    this.langUpdated.emit(this.plata);
    console.log(this.plata);
  }
  getppt() {
    let y = this.plata[4]
    let u = this.plata[5]
    return y + u;
  }
  addToList(p:presupostI){
    console.log(p);
    this.presupost.push(p)
    localStorage.setItem('list'+this.i,JSON.stringify(p))
    this.i++;
  }
getData():presupostI{
  if(this.plata[4]== 0||this.plata[5]== 0){
    this.web=false
  }
  let ppt:presupostI={ web: this.web,
    seo:this.seo,
    ads:this.ads,
    npgs:this.plata[4],
    nid:this.plata[5]
  }
  return ppt;
}
  getAllPresupost(){
    let x=1;
    let list=[]
    while(x<=this.i){
      list[x-1]=localStorage.getItem('list'+x);
      x++;
    }
    console.log(list);
    return list;
  }
}
