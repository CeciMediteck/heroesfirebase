import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from "./components/heroes/heroes.component"; 
import { HeroeComponent } from "./components/heroes/heroe.component"; //Carga
import { FotosComponent } from "./components/heroes/fotos.component";

const app_routes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'fotos', component: FotosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
