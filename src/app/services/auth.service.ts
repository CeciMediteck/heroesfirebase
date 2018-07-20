import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}


  //********Login GOOGLE */
  loginGoogle() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  //Creacion de Usuario
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  //Metodo de Login
  loginEmail( email: string, pass: string ) {
    return new Promise (( resolve, reject ) => {
      this.afAuth.auth.signInWithEmailAndPassword ( email, pass )
      .then( userData => resolve( userData ),
    err => reject(err));
    })
  }

  //Comprueba cuando la aplicacion carga cuando el usuario esta logado
  getAuth(){ //recupera alguien logado
    return this.afAuth.authState.map ( auth => auth);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
