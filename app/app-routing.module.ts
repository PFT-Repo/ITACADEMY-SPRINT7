import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: '', component: BienvenidaComponent },
  { path: 'home', component: HomeComponent},
  { path: "home/", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
