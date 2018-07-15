import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from "./app.routes";

// Servicios
import { HeroesService } from "./services/heroes.service";
import { CargaImagenesService} from './services/carga-imagenes.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
import { HttpClientModule } from '@angular/common/http';
import { KeysPipe } from './pipes/keys.pipe';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { NgDropDFilesDirective } from './directives/ng-drop-dfiles.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent,
    KeysPipe,
    NgDropDFilesDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), //.firebase
    AngularFirestoreModule.enablePersistence(),
    //AngularFireAuth comentado
  ],
  providers: [
    HeroesService,
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
