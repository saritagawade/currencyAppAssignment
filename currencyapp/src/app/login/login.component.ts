import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;
  loginForm : FormGroup;
  loginData:String[]=[];
  errorMessage:any;
  msg:any;
  constructor(private router: Router,fb: FormBuilder,private loginservice:LoginService) {
    let emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = fb.group({
             'email': ['', [<any>Validators.required,  <any>Validators.pattern(emailRegex) ]],
             'password': [null,[<any>Validators.required]]

    })
  }

  login(){
    //alert("login"+this.email);
    //alert("pass"+this.password);
    const newUser={
      email_id:this.email,
      password:this.password
    }

    //alert(JSON.stringify(newUser));
    this.loginservice.userLogin(newUser)
    .subscribe(logins=>{
      //this.loginData=logins;
      console.log(logins);
      
        if(logins['status']==201 ) 
          {
              this.router.navigate(['/currency']);
          }
      
    },
      error => {
      this.errorMessage=<any>error
      var res =JSON.parse(this.errorMessage);
    this.msg=res['text'];
    alert(this.msg);
    //this.show=true;
     })

  }

  ngOnInit() {
  }

}
