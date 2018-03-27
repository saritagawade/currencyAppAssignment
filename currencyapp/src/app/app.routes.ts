import {Routes,RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {LoginComponent} from './login/login.component';
import{RegistrationComponent} from './registration/registration.component';
import {CurrencyExchageComponent} from './currency-exchage/currency-exchage.component'
const appRoutes: Routes = [
    {path:'',component:LoginComponent},
    {path:'register',component:RegistrationComponent},
    {path:'currency',component:CurrencyExchageComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
