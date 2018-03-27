import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


@Injectable()
export class RegistrationService {

  constructor(private http: Http) { }
     addUser(newUser)
     { 
        console.log("in regi service");
     var headers = new Headers();
     headers.append('Content-Type','application/json');
    // console.log("in service",newUser)
     
     return this.http.post('http://localhost:3000/user/saveUser', newUser,{headers:headers})
      .map((res) =>        
             res.json())
              .catch((error:any)=>{throw(error.json().error || error['_body'])});
    
   } 

}
