import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  //Login de Usuario
  onSubmitLogin(){
    this.authService.loginEmail( this.email, this.password )
    .then(( res ):any => { //agregue.any
      this.flashMensaje.show("Usuario Logado Correctamente.", {
        cssClass: "alert-success",
        timeout: 6000});

      this.router.navigate([ '/heroes' ])
    }).catch (( err ) =>{
      console.log( err );
      this.flashMensaje.show(err.message, {
        cssClass: "alert-danger",
        timeout: 6000});
      this.router.navigate ([ '/login' ]);
    });
  }

  //Login con Google
  onClickGoogleLogin() {
    //console.log('Bien Gooogle');
    this.authService.loginGoogle()
    .then(( res ) => {
      this.router.navigate(['/heroes']);
    }).catch( err => console.log( err.message ));
  }

  //Login con Facebook
  onClickFacebookLogin() {
    this.authService.loginFacebook()
    .then(( res ) => {
      this.router.navigate(['/heroes']);
    }).catch( err => console.log( err.message ));
  }

  //Login con Twitter
  onClickTwitterLogin() {
    this.authService.loginTwitter()
    .then(( res ) => {
      this.router.navigate(['/heroes']);
    }).catch( err => console.log( err.message ));
  }
}
