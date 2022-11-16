import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  constructor() { }
  langUpdated = new EventEmitter();
  private plata: number[] = [];

  getTotal() {
    console.log("funcionó hasta acá");
    console.log(this.plata);
    let res = this.plata.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    return res;
  }

  addPrice(number: number) {
      this.plata.push(number);
      this.langUpdated.emit(this.plata);
      console.log(this.plata);
  }
  subPrice(number: number) {
    if (number >= 0) {
      this.plata.push(number);
    }
  }
}
