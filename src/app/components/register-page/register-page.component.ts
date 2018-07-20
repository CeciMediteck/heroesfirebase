import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  //Metodo que ejecuta formulario
  onSubmitAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then (( res ) => {

      //si todo va bien
      this.router.navigate ([ '/heroes' ]);

    }).catch ( ( err ) => {
      console.log( err );
    })
  }

}
