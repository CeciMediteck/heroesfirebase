import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) {}

  ngOnInit() {}

  //Metodo que ejecuta formulario
  onSubmitAddUser() {
    this.authService
      .registerUser(this.email, this.password)
      .then(res => {
        //Notificacion de creacion de cuenta
        this.flashMensaje.show("Usuario Creado Correctamente.", {
          cssClass: "alert-success",
          timeout: 6000
        });
        //si todo va bien
        this.router.navigate(["/heroes"]);
      })
      .catch(err => {
        this.flashMensaje.show(err.message, {
          cssClass: "alert-danger",
          timeout: 6000
        });
        console.log(err);
      });
  }
}
