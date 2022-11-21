import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {presupostI} from "src/app/interfaces/presupost-i";
import {TotalAmountService} from "src/app/services/total-amount.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnChanges, DoCheck {
  preuFinal: number = 0;
  in: number = 0;
  listActive: boolean = false;
  realFinal: number = 0;
  canSubmit = false;
  queriesGot: any;
  u = this.serve.getAllPresupost();
  nom = document.getElementById("clienteInput") as HTMLInputElement | null;
  listaFinal: any[] = [];
  activePanel = false;
  preciofinal = document.getElementById("precioPublico");
  constructor(
    private router: Router,
    public serve: TotalAmountService,
    private route: ActivatedRoute
  ) {
    this.realFinal = this.serve.getTotal();
    this.firstLoad();
    //this.myMethodChangingQueryParams();
    this.listaFinal = this.serve.getAllPresupost();
  }

  firstLoad() {
    this.route.queryParamMap.subscribe((params) => {
      this.queriesGot = {...params};
      this.serve.web =
        this.queriesGot.params.paginaWeb == "true" ? true : false;
      if (this.serve.web == true) {
        this.makeChecks('paginaWebCheck')
        this.checker('paginaWebCheck')
      }
      this.serve.seo =
        this.queriesGot.params.campaniaSeo == "true" ? true : false;
      if (this.serve.seo == true) {
        this.makeChecks('consultoriaCheck')
        this.checker('consultoriaCheck');
      }

      this.serve.ads =
        this.queriesGot.params.campaniaAds == "true" ? true : false;
      if (this.serve.ads) {
        this.makeChecks('googleAdsCheck');
        this.checker('googleAdsCheck');
        }
      let r = this.queriesGot.params.nPaginas;
      let o = this.queriesGot.params.nIdiomas;
      if (r != null && o != null) {
        if (parseInt(r) >= 1 && parseInt(o) >= 1) {
          this.activePanel = true;
          this.serve.web = true;
        }

        this.sendPrices(4, parseInt(r));
        this.sendPrices(5, parseInt(o));
      }
    });
  }
  makeChecks(s:string){
    let checkbox = document.getElementById(s) as HTMLInputElement | null;
    if (checkbox) {
      checkbox.checked=true;
  }
}
  myMethodChangingQueryParams() {
    const queryParams = {
      paginaWeb: this.serve.web,
      campaniaSeo: this.serve.seo,
      campaniaAds: this.serve.ads,
      nPaginas: this.serve.getPag(),
      nIdiomas: this.serve.getIdi(),
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge", // remove to replace all query params by provided
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.realFinal = this.serve.getTotal();
    this.myMethodChangingQueryParams();
    this.listaFinal = this.serve.getAllPresupost();
    this.ngDoCheck();
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
    this.serve.langUpdated.subscribe(() => {
      this.updateReal();
    });

    if (this.u[0] != null) {
      this.listaFinal = this.serve.getAllPresupost();
      this.serve.listaActive = true;
    }
  }

  ngDoCheck() {
    let y = <HTMLInputElement>document.getElementById("clienteInput");
    let p = <HTMLInputElement>document.getElementById("proyectoInput");
    if ((y.value, p.value) != "") {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
  }

  ngOnChange() {
    this.updateReal();
    this.myMethodChangingQueryParams();
    this.listaFinal = this.serve.getAllPresupost();
    this.ngDoCheck();
  }
  cheche(): boolean {
    let y = <HTMLInputElement>document.getElementById("clienteInput");
    let p = <HTMLInputElement>document.getElementById("proyectoInput");
    if ((y.value, p.value) != "") {
      this.canSubmit = true;
      return true;
    } else {
      this.canSubmit = false;
      return false;
    }
  }

  updateReal() {
    this.realFinal = this.serve.getTotal();
    this.myMethodChangingQueryParams();
  }
  checker(id: string) {
    let checkbox = document.getElementById(id) as HTMLInputElement | null;
    if (checkbox) {
      if (id == "paginaWebCheck") {
        this.in = 0;
        this.serve.web = true;
      }
      if (id == "consultoriaCheck") {
        this.in = 1;
        this.serve.seo = true;
      }
      if (id == "googleAdsCheck") {
        this.in = 2;
        this.serve.ads = true;
      }
      let valor = parseInt(checkbox.value);
      if (checkbox?.checked) {
        if (id == "paginaWebCheck") {
          this.activePanel = true;
        }

        this.preuFinal += valor;
        this.sendPrices(this.in, valor);
        this.updateReal();
        this.ngDoCheck();
      } else {
        if (id == "paginaWebCheck") {
          this.serve.web = false;
          this.activePanel = false;
          this.sendPrices(4, 0);
          this.sendPrices(5, 0);
          this.realFinal = this.serve.getTotal();
        } else if (id == "consultoriaCheck") {
          this.serve.seo = false;
        } else if (id == "googleAdsCheck") {
          this.serve.ads = false;
        }
        this.sendPrices(this.in, 0);
        this.preuFinal -= valor;
        this.realFinal = this.serve.getTotal();
        this.ngDoCheck();
      }
    }
  }
  sendPrices(index: number, number: number) {
    this.serve.addPrice(index, number);
  }
  resetForm() {
    let y = <HTMLInputElement>document.getElementById("clienteInput");
    y.value = "";
    let p = <HTMLInputElement>document.getElementById("proyectoInput");
    p.value = "";
    let c = 0;
    let ids: any[] = ["paginaWebCheck", "consultoriaCheck", "googleAdsCheck"];
    while (c < ids.length) {
      let checkbox = document.getElementById(ids[c]) as HTMLInputElement | null;
      if (ids[c] == "paginaWebCheck") {
        this.serve.web = false;
      } else if (ids[c] == "consultoriaCheck") {
        this.serve.seo = false;
      } else if (ids[c] == "googleAdsCheck") {
        this.serve.ads = false;
      }
      if (checkbox != null) {
        checkbox.checked = false;
      }
      this.sendPrices(c, 0);
      c++;
    }
    this.activePanel = false;
    this.sendPrices(4, 0);
    this.sendPrices(5, 0);
  }
  submit() {
    if (this.cheche() == true) {
      let y = (<HTMLInputElement>document.getElementById("clienteInput")).value;
      let p = (<HTMLInputElement>document.getElementById("proyectoInput"))
        .value;
      this.serve.pushClient(y);
      this.serve.pushProyect(p);
      let w: presupostI = this.serve.getData();
      this.serve.addToList(w);
      this.listaFinal = this.serve.getAllPresupost();
      this.serve.listaActive = true;
      this.resetForm();
    }
  }
}
