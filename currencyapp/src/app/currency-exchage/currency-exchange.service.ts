import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class CurrencyExchangeService {

  
  constructor(private http:Http) {
     
   }

  

  getExchangedValue(exchageVal,from,to,date){

     var user = JSON.parse(localStorage.getItem("currentUser"));
      var token=user.token;
      let headers = new Headers();
	   	headers.append('Content-Type', 'application/json');
       headers.append('token', `${token}`);
        let options = new RequestOptions({ headers: headers });
        
    //alert("alert in currency service");
    return this.http.get(`http://localhost:3000/currency/rates/${exchageVal}/${from}/${to}/${date}`,options)
    .map(res=>res.json())
    .catch((error:any)=>{throw(error.json().error || error['_body'])});

  }

  gethistory(){
    //alert("in getHistory");

     var user = JSON.parse(localStorage.getItem("currentUser"));
      var token=user.token;
      let headers = new Headers();
	   	headers.append('Content-Type', 'application/json');
       headers.append('token', `${token}`);
        let options = new RequestOptions({ headers: headers });

    return this.http.get('http://localhost:3000/currency/getCurrency',options)
    .map(res=>res.json());
    //.catch((error:any)=>{throw(error.json().error|| error['body'])});
  }
   


}
