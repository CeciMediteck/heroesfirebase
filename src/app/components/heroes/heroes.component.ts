import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from '../../interfaces/heroe.interface';

import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  estaSobreElemento = false;
   //variable a ocupar
   archivos: FileItem [] = []; //Arreglo de FileItems

  heroes:any[] = [];
  loading: boolean = true; //indica si esta cargando o no

  constructor( private _heroesService: HeroesService, public _cargaImagenes: CargaImagenesService) { 
    this._heroesService.getHeroes()
      .subscribe( (data: Heroe[]) => { 
        //Se cancela cuando se termina de cargar la Data
        // this.loading = false;
          this.loading = false;
          this.heroes = data;

      })
  }

  ngOnInit() {  }

  borraHeroe( key$:string ){

    this._heroesService.borrarHeroe(key$)
        .subscribe( respuesta => {
          if( respuesta ){
            console.error(respuesta);
          } else {
            //todo bien
            delete this.heroes[key$];
          }
        })
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }
  
}
