import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from "./components/heroes/heroes.component"; //fotos
import { HeroeComponent } from "./components/heroes/heroe.component"; //Carga

const app_routes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
