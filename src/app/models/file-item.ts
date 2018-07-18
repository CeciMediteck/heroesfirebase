export class FileItem {

    public archivo: File; //Archivo fisico seleccionado
    public nombreArchivo: string;
    public url: string;  //retornado por Firebase
    public estaSubiendo: boolean; //bandera indica si se sube o no
    public progreso: number; 

    constructor ( archivo: File ){
        //inicializacion de propiedades
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.estaSubiendo = false;
        this. progreso = 0;

    }

}