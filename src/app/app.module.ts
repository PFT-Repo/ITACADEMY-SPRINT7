import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalAmountService } from './total-amount.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TotalAmountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
