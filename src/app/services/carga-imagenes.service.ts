import { Injectable } from '@angular/core';
//Firebase
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable()
export class CargaImagenesService {

  //FIREBASE
  private CARPETA_IMAGENES = 'img'; //Carpeta en la que colocamos imagenes, img se llamara el objeto (referencia e imagen)

  constructor( private db: AngularFirestore ) { }

   cargarImagenesFirebase( imagenes: FileItem[] ) {
    //console.log( imagenes );

    //Hacer referencia al Storage
    const storageRef = firebase.storage().ref();

    for ( const item of imagenes){
      item.estaSubiendo = true;
      if ( item.progreso >= 100 ){
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = 
                storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                          .put( item.archivo);

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                  ( snapshot: firebase.storage.UploadTaskSnapshot ) => 
                              item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes)*100,
                  ( error) => console.error('Error a; subir', error),
                  () => {

                      console.log('Imagen cargada correctamente');
                      item.url = uploadTask.snapshot.downloadURL;
                      item.estaSubiendo = false;

                      this.guardarImagen({
                        nombre: item.nombreArchivo,
                        url: item.url
                      });
                  });
    }

  }

  private guardarImagen (imagen: {nombre: string, url: string} ) { //Metodo para grabar a Firebasa //recibe una imagen
    this.db.collection( `/${ this.CARPETA_IMAGENES }` ) //graba a firebase se especifica el lugar
        .add ( imagen );
    }

}
