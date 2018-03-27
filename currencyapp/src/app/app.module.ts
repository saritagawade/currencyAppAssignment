import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
//import {MyDatePickerModule} from 'mydatepicker';
import {routing} from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CurrencyExchageComponent } from './currency-exchage/currency-exchage.component';
import {LoginService} from './login/login.service';
import {RegistrationService} from './registration/registration.service'
import {CurrencyExchangeService} from './currency-exchage/currency-exchange.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CurrencyExchageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [LoginService,RegistrationService,CurrencyExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
