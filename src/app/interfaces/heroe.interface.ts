
// La interfaz nos sirve para saaber que datos son los que puede manejar un heroe
export interface Heroe {
    nombre: string;
    bio: string;
    casa: string;
    key$?: string; // Es una llave que Genera por nosoros el files
}
