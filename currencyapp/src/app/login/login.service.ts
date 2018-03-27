import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


@Injectable()
export class LoginService {
  
  token:String;
  constructor(private http:Http) { }

  userLogin(newUser){
    //console.log('in login service');
    let headers=new Headers();
      headers.append('Content-Type','Application/json');
      let options=new RequestOptions({headers:headers});
       return this.http.post('http://localhost:3000/login',newUser,options)
       .map((res) => this.setToken(res))
       .catch((error:any)=>{throw(error.json().error || error['_body'])});
  }
    setToken(res){
     
    let body = JSON.parse(res['_body']);
   
    //console.log("in set token"+JSON.stringify(body));
    if( body['status'] == 201 ){
      
       this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        email: body.user, 
        token: this.token 
      }));
       
    }

    return body;
  }

    
  userLogout(){
       var user = JSON.parse(localStorage.getItem("currentUser"));
      
       var token=user.token;
      
       let headers = new Headers();
	   	headers.append('Content-Type', 'application/json');
       headers.append('token', `${token}`);
        let options = new RequestOptions({ headers: headers });
         
   

       return this.http.delete('http://localhost:3000/logout',options)
                            .map(res=>res.json())
                            .catch((error:any)=>{throw(error.json().error || 'server error')});
      
    
  }



}
