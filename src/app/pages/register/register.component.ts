import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request';
import { AuthentficationService } from 'src/app/services/authentfication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = new RegisterRequest();
  errorMsg !: string;
  constructor(private authService: AuthentficationService, private router: Router) { }

  ngOnInit(): void {

  }
  register() {
    this.authService.register(this.registerRequest)
      .subscribe(result => {
        this.router.navigate(['/authentification'])
        console.log(result)

      },
        (err: HttpErrorResponse) => this.errorMsg = 'this email is existe')
  }

}


