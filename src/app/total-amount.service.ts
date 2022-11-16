import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  constructor() { }
  langUpdated = new EventEmitter();
  private plata: number[] = [0, 0, 0, 0, 0, 0];

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
}
