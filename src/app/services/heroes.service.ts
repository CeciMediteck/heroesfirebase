//Los servicios son los encargados de trabajar con la base de datos
//y de realizar peticiones PUT, POST, GET, DELETE

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Heroe } from "../interfaces/heroe.interface";
import {map} from 'rxjs/operators'; 

@Injectable()

export class HeroesService {
  //URL usados para hacer operaciones.
  heroesURL: string = "https://heroesapp-2e2ec.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-2e2ec.firebaseio.com/heroes/";

  constructor(private http: HttpClient) { } //objetos de solicitud y respuesta, Observables, manejo de errores

  // AGRERA HEROES 
  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe); //Es un string de unJSON valido
    let headers = new HttpHeaders({ //definicion de encabezado
      'Content-Type': "application/json"
    });

    //La funcnion debe regresar un observable para saber si se insertó o no 
    //http.post retorna un observable
    return this.http.post(this.heroesURL, body, { headers:headers })
    .pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  // ACTUAIZA LOS HEROES
  actualizarHeroe( heroe: Heroe, key$:string ) {

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': "application/json" 
    });

    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.put( url, body, { headers:headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

    // OBTIENE UN HEROE
  getHeroe (key$:string){
    let url = `${this.heroeURL }/${ key$ }.json`;
    return this.http.get( url )

    .pipe (
      map(res => res)
    );
  }

  // OBTIENE TODOS LOS HEROES 
  getHeroes (){
    return this.http.get( this.heroesURL )

    .pipe (
      map(res => res)
    );
  }

  //BORRA UN HEROE
  borrarHeroe( key$:string){

    let url = `${ this.heroeURL }/${key$}.json`;
    return this.http.delete( url)
      .pipe (
        map( res => res )
      )
  }

}
