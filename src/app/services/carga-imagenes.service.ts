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

  //Es un servicio
  cargarImagenesFirebase(imagenes: FileItem[]) {
    //console.log( imagenes );

    //Hacer referencia al Storage
    const storageRef = firebase.storage().ref();

    //Barrido de imagenes
    for (const item of imagenes) {
      //Obtiene una por una
      item.estaSubiendo = true; //Archivo subiendo
      if (item.progreso >= 100) {
        continue; //Archivo subido, continua con las iteraciones
      }

      const referenciaImagen = storageRef.child(
        `${this.CARPETA_IMAGENES}/${item.nombreArchivo}`
      );
      const uploadTask: firebase.storage.UploadTask = referenciaImagen.put(
        item.archivo
      );

      //Ejecucion
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error("Error al subir", error),
        () => {
          referenciaImagen.getDownloadURL().then(
            urlImagen => {
              console.log("Imagen cargada correctamente");
              item.url = urlImagen;
              item.estaSubiendo = false;
              this.guardarImagen({
                nombre: item.nombreArchivo,
                url: item.url
              });
            },
            error => console.log("No existe la URL")
          )
        }
      );
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    //Metodo para grabar a Firebasa //recibe una imagen

    this.db
      .collection(`/${this.CARPETA_IMAGENES}`) //graba a firebase se especifica el lugar
      .add(imagen);
  }
}
