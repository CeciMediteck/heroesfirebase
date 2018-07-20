import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { APP_ROUTING } from "./app.routes";

// Servicios
import { HeroesService } from "./services/heroes.service";
import { CargaImagenesService} from './services/carga-imagenes.service';
//import { AuthService } from './services/auth.service'

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { FotosComponent } from './components/heroes/fotos.component'
import { HttpClientModule } from '@angular/common/http';
import { KeysPipe } from './pipes/keys.pipe';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { NgDropDFilesDirective } from './directives/ng-drop-dfiles.directive';

import { HeroesModule } from "./components/heroes/heroes.module";
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PrivadoPageComponent } from './components/privado-page/privado-page.component';
import { NotfoundPageComponent } from './components/notfound-page/notfound-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent,
    FotosComponent,
    KeysPipe,
    NgDropDFilesDirective,
    HomePageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    PrivadoPageComponent,
    NotfoundPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    HeroesModule
  ],
  providers: [
    HeroesService,
    CargaImagenesService,
    //AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
