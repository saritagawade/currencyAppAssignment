import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {RegistrationService} from './registration.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit {
registrationForm:FormGroup;
  cities=['Pune','Mumbai','Nagpur','Aurangabad'];
  country=['India','America','France','Italy'];

  
    firstName:String;
    lastName:String;
    dob:Date;
    email:String;
    street:String;
    zipcode:Number;
    selectedCity: Object = {};
    selectedCountry:String;
    password:String;
    confirmpasswd:String;
    msg:String;
    errorMessage:any;
  

  constructor(fb: FormBuilder,private regService:RegistrationService,private router:Router) {
      let emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registrationForm = fb.group({
            'firstName':[null,Validators.compose([Validators.required,Validators.pattern('[a-z A-Z]*')])],
            'lastName': [null,Validators.compose([Validators.required,Validators.pattern('[a-z A-Z]*')])],
            'dob':[],
           // 'state' :[null,Validators.compose([Validators.required])],
           'zipcode':[null,Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
            'street':[],
            'city' : ['', Validators.compose([Validators.required])],
            'country':['', Validators.compose([Validators.required])],
            'email': ['', [<any>Validators.required,  <any>Validators.pattern(emailRegex) ]], 
            'password' : [null,[<any>Validators.required]],
            'confirmpasswd' : [null, Validators.required]
      
                },
        
     {
    validator: this.checkIfMatchingPasswords('password', 'confirmpasswd')
}
  )
   }
//To check password and Confirm password are same
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
          return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
             
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
              
                return passwordConfirmationInput.setErrors(null);
            }
          }
        }

   callType(value){
    console.log(value);
    this.selectedCity=value;
    //this.order.type=value;
  }
  selectCnt(value){
    //alert(value);
    this.selectedCountry=value;
  }
  registeUser(){
    //alert("in register");
    //alert(JSON.stringify(this.registrationForm.value));
    const newUser={
      first_name:this.firstName,
    last_name:this.lastName,
    DOB:this.dob,
    email_id:this.email,
    street_name:this.street,
    zipcode:this.zipcode,
    city:this.selectedCity,
    country:this.selectedCountry,
    password:this.password
    }
  this.regService.addUser(newUser)
  .subscribe(register=>{
    console.log(register);
      if(register['status']=='201')
         { 
                 // console.log("in if");
                   
                 this.router.navigate(['/']);
                 
      }
      // else{
      //     //console.log("inelse");
      //     this.msg=register[0]['text'];
      //     alert(this.msg);
      //    //this.show=true;
      //     this.router.navigate(['/register']);
         
      //   }
  },
    error => {
      this.errorMessage=<any>error
      var res =JSON.parse(this.errorMessage);
    this.msg=res['text'];
    alert(this.msg);
    //this.show=true;
     }
)
//alert(JSON.stringify(newUser));
    //console.log(newUser);
    //alert("Name:"+this.firstName);
  }

  ngOnInit() {
  }

}
