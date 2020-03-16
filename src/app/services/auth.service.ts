import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
                private auth: AngularFireAuth,
                private firestore: AngularFirestore
                ) {}

  initAuthListerner(){
    // nos ayudara con la autenticación - tengamos usuario o cerrermos sesión
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log({nombre,email, password})
    return this.auth.createUserWithEmailAndPassword(email, password)
               .then( ({user}) => {

                 const newUser = new Usuario( user.uid , nombre, user.email );

                 return this.firestore.doc(`${ user.uid }/usuario`).set( { ...newUser }); // firebase acepta solo objeto no instancias de clases para insertar
           
               });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(){
    // Regresará un observable que diga si está autenticado o no
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null) // si existe regresa un true 
    ) // regresa un obs que resuelve el usuario de firebase

  }
}
