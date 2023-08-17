import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { AuthentficationService } from 'src/app/services/authentfication.service';

import jwt_decode from 'jwt-decode';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
/*export class AuthentificationComponent implements OnInit {
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(private service: AuthentficationService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });*/


export class AuthentificationComponent implements OnInit {
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  errorMsg: string = ""
  path: string = "../assets/img/boxed-bg.jpg";
  data: any;
  form: FormGroup;
  decodedToken: { [key: string]: string };

token:string = "";

  constructor(private authService: AuthentficationService, private router: Router,
                 private formBuilder: FormBuilder, private jwtService: JwtService) { }

  ngOnInit(): void {
    localStorage.removeItem("accesstoken")

    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,]],
      },
    );
  }
  login() {
 /*   var token = "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQ0xJRU5UIn1dLCJzdWIiOiJqaWhlZC5ib3Vha2V6QGdtYWlsLmNvbSIsImlhdCI6MTY5MjIwMDg1MiwiZXhwIjoxNjkyMjA2ODUyfQ.kFpEIgZpUFsVWOuOZqYbBP5R_EjdsG-80EerVxzW5g8";
    var decoded = jwt_decode(token);
     
    console.log(decoded);*/

//    console.log("authrequest is ----->:"+this.authenticationRequest.email)
   this.authService.authenticate(this.authenticationRequest).subscribe(
      (ress) => {
        this.authService.setUserToken(ress)

       // console.log("tokenResult", ress) 
        this.token=ress.access_token
      //  console.log(this.token) 

          // methode de decodage de token en utilusant un service jwtService developper dans le fichier jwtservice
          // après avoir ajouter jwtmodule dans app.component.ts après avoir installer  jwt-decode par npm install

                    /*const userEmail = this.jwtService.getClaim(this.token, 'sub');
                    console.log('User Email:', userEmail);*/

        // methode de decodage de token après installation de @auth0/angular-jwt et on faisant l'imporattion dans la partie
        // import de ce fichier 
        this.decodedToken = jwt_decode(this.token)
        if(this.decodedToken['authorities'][0]['authority']=="CLIENT")
        {
          this.router.navigate(["home"])
        }

   //  console.log(ress)
   
       // 

      }, error => {
        this.errorMsg = "login ou mot de pass incorect"
      }
     
    )
    
   // this.decodedToken = jwt_decode((this.authResp.accessToken).toString()); 
    //console.log(this.decodedToken.toString) 
  }


  login1() {
    this.authService.loggin(this.form.value).subscribe(
      (ress) => {
        console.log("testRess", ress)
        localStorage.setItem("accesstoken", JSON.stringify(ress))
        

        this.router.navigate(["home"])

      }, error => {
        this.errorMsg = "login ou mot de pass incorect"
      }
    )

  }

  // service qui perment de verifier si un token is valid or not !!!!!
  /*import { Injectable } from '@angular/core';
  import { JwtHelperService } from '@auth0/angular-jwt';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {}
    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      // Check whether the token is expired and return
      // true or false
      return !this.jwtHelper.isTokenExpired(token);
    }
  }*/
}