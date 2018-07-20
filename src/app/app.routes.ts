import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from "./components/heroes/heroes.component"; 
import { HeroeComponent } from "./components/heroes/heroe.component"; //Carga
import { FotosComponent } from "./components/heroes/fotos.component";
import { LoginComponent } from "./login/login.component";

const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'fotos', component: FotosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
