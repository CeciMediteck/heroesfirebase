import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from "./components/heroes/heroes.component"; 
import { HeroeComponent } from "./components/heroes/heroe.component"; //Carga
import { FotosComponent } from "./components/heroes/fotos.component";

//Componentes del Login
import { HomePageComponent} from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent} from './components/register-page/register-page.component';
import { PrivadoPageComponent} from './components/privado-page/privado-page.component';
import { NotfoundPageComponent} from './components/notfound-page/notfound-page.component';


const app_routes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'fotos', component: FotosComponent },

    //Login
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'privado', component: PrivadoPageComponent },

    { path: '**', component: NotfoundPageComponent},
    //{ path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
