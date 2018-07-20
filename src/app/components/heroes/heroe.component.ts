import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})

export class HeroeComponent implements OnInit {

  //Para poder setear datos y poder realizar el posteo de esa inf.
    public heroe:Heroe = {
      nombre:"",
      bio:"",
      casa:"Marvel"
    }

  nuevo: boolean = false;
  id: string; // Es la llave

  constructor(private _heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
    ){
      // Esto es un observable
      this.route.params
      .subscribe( parametros => {
          this.id = parametros['id']
    
          if ( this.id !== "nuevo"){
            
            this._heroesService.getHeroe( this.id )
            .subscribe( (heroe:any) => this.heroe = heroe) // Si funciona
          }
      });
    }

    ngOnInit() {  }

    guardar() {  //GUARDA LOS HEROES
      console.log(this.heroe);
      
      if (this.id == "nuevo") {
        //insertando
        this._heroesService.nuevoHeroe(this.heroe)
        .subscribe((data:any) => {
          this.router.navigate(['/heroes', data.name]) //Despues de guardar muestra la lista
        },
        error => console.error(error));
      } else {
        //Actualizando
        this._heroesService.actualizarHeroe(this.heroe, this.id)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['/heroes']) //Despues de actualizar regresa a la lista de heroes
        },
        error => console.error(error));
      }
    }

    agregarNuevo( forma: NgForm ){

      this.router.navigate (['/heroe', 'nuevo']); //Se mantiene en la pagina de agregar nuevo heroe 

      forma.reset({
        casa: "Marvel"
      });
    }

    
}
