export class Usuario{

    static fromFirebase( { uid, nombre, email }){
        // con este metodo obtendremos una nueva instancia de usuario
        return new Usuario(uid,nombre,email);
    }
    
    constructor(
        public uid:string,
        public nombre:string,
        public email:string,
    ){

    }
}