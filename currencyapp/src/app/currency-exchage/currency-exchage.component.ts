import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {CurrencyExchangeService} from './currency-exchange.service';
@Component({
  selector: 'app-currency-exchage',
  templateUrl: './currency-exchage.component.html',
  styleUrls: ['./currency-exchage.component.css'],
  providers: [LoginService,CurrencyExchangeService]
})
export class CurrencyExchageComponent implements OnInit {

  token:String;
  currencyExchangeForm:FormGroup;
  fromCurrencyArray=['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','CAD','EUR','GBP','HUF','JPY','INR','NZD','USD'];
  //toCurrencyArray=['AED','AFN','ALL','AMD','ANG'];
  constructor(private router: Router,private loginservice:LoginService,private exchangeservice:CurrencyExchangeService,fb: FormBuilder) { 

     this.currencyExchangeForm = fb.group({
       'exchangeValue':[null,Validators.compose([Validators.required])],
       'from':['',Validators.compose([Validators.required])],
       'to':['',Validators.compose([Validators.required])],
       'exdate':['',Validators.compose([Validators.required])]
     })
  }
selectedToCurr:String;
selectedFromCurr:String;
exchangeValue:Number;
exDate:Date;
res:any;
history:any;
returnVal:Number=0;
isVal=false;


selectedToCurrency(value){
  //alert(value);
  this.selectedToCurr=value;

}

selectedFromCurrency(value){
 // alert(value);
  this.selectedFromCurr=value;
}

exchangeCurrency(){
var exchangeVal=this.exchangeValue;
var from=this.selectedFromCurr;
var to=this.selectedToCurr;
var date=this.exDate;

//alert(date);

console.log(exchangeVal,from,to,date);
this.exchangeservice.getExchangedValue(exchangeVal,from,to,date)
.subscribe(
      res => { this.res = res;
        this.isVal=true;
        this.returnVal= this.res['value'];
        // alert(this.isVal);
        // alert(this.returnVal);
      
      },
      //err => { console.log(err)}
    );

//this.returnVal=0;

}

    logout() {            
                              this.loginservice.userLogout()
                              .subscribe(deleteduser=> {
                                console.log(deleteduser);
                               
                                              this.router.navigate(['/']);
                                });
                            
                            this.token= null
                            localStorage.removeItem('currentUser');


                 }

                 refresh(){
                   window.location.reload();

                 }
  ngOnInit() {

    this.exchangeservice.gethistory()
    .subscribe(result=>{
      
      this.history=result;
      //window.location.reload();
      //console.log(this.res[0]['exchange_value'])
    });
  }

}
