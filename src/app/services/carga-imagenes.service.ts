import { Injectable } from "@angular/core";
//Firebase
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

import { FileItem } from "../models/file-item";

@Injectable()
export class CargaImagenesService {
  //FIREBASE
  private CARPETA_IMAGENES = "img"; //Carpeta en la que colocamos imagenes, img se llamara el objeto (referencia e imagen)

  constructor(private db: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {
    //console.log( imagenes );

    //Hacer referencia al Storage
    let storageRef = firebase.storage().ref();

    //Barrido de imagenes
    for (const item of imagenes) {
      item.estaSubiendo = true; //Archivo subiendo
      if (item.progreso >= 100) {
        continue; //Archivo subido, continua con las iteraciones
      }

      //No esta subido completamente
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo); //imagen fisica

      //Ejecucion
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100), //indeca el progreso
        error => console.error("Error al subir", error),
        () => {
          //Todo correctamente

          console.log("Imagen cargada correctamente");
          item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;

          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          });
        });
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    //Metodo para grabar a Firebasa //recibe una imagen
    this.db.collection(`/${this.CARPETA_IMAGENES}`) //graba a firebase se especifica el lugar
      .add(imagen); //Grabar objeto
  }
}
