import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from "@angular/core";
import { FileItem } from "../models/file-item";
import { ReturnStatement } from "../../../node_modules/@angular/compiler";

@Directive({
  selector: "[appNgDropDFiles]"
})
export class NgDropDFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  //Mouse encima
  @HostListener("dragover", ["$event"])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDtetener( event );
  }

  //Mouse se aleja
  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

//Cuando se suelta el mouse
  @HostListener("drop", ["$event"])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);

    const transferencia = this._getTransferencia( event );

    if ( !transferencia ){
      return;
    }

    this._extraerArchivos( transferencia.files );

    this._prevenirDtetener( event );
    this.mouseSobre.emit( false );
  }

  //Ayuda a compatibilidad para interpretar drag and drop
  private _getTransferencia( event: any ){
    //Para extender la compatibilidad
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  //Para trabajar con los archivos
private _extraerArchivos( archivosLista: FileList){ //OBTIENE TODOS los archivos que hice drag and drop
  //console.log( archivosLista );

  //Separar el objeto
  for ( const propiedad in Object.getOwnPropertyNames ( archivosLista )){
//getOwnPropiertyNames toma las propiedades y las convierte en un arreglo
    const archivoTemporal = archivosLista [propiedad];//Es el nuevo archivo

    //se evalua el nuevo archivo para ver si puede ser cargado, que no exista ya, que SI sea imagen
    if (this._archivoPuedeSerCargado( archivoTemporal) ){
      const nuevoArchivo = new FileItem( archivoTemporal );
      this.archivos.push( nuevoArchivo );
    }
  }
console.log(this.archivos);
 }

  //Validaciones
  private _archivoPuedeSerCargado ( archivo: File ): boolean {

    if ( !this._archivoYaFueDropeado ( archivo.name ) && this._esImagen(archivo.type)){
      return true;
    }else {
      return false;
    }
  }

  private _prevenirDtetener( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  //Validacion para asegurar que el archivo ya no exista en el arreglo
  private _archivoYaFueDropeado ( nombreArchivo: string ): boolean {

    for ( const archivo of this.archivos ){

      if ( archivo.nombreArchivo == nombreArchivo ){
        console.log( 'El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;//encontrado
      }
    }
    return false; //No lo encontro
  }
  
  //Verifica si son imagenes
  private _esImagen( tipoArhivo: string): boolean{
    return ( tipoArhivo === '' || tipoArhivo === undefined ) ? false : tipoArhivo.startsWith('image');
  }
}
