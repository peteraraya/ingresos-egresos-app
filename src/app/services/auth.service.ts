import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from "../ingreso-egreso/ingreso-egreso.actions";
@Injectable({
  providedIn: "root"
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  get user(){
    return this._user;
  }

  constructor(
                private auth: AngularFireAuth,
                private firestore: AngularFirestore,
                private store: Store<AppState>
                ) {}

  initAuthListerner(){
    // nos ayudara con la autenticación - tengamos usuario o cerrermos sesión
    this.auth.authState.subscribe( fuser => {
      
      if (fuser) {
        // existe
         this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
                                    .subscribe( (firestoreUser:any) =>{
                                      // console.log(firestoreUser);
                                      const user = Usuario.fromFirebase( firestoreUser);
                                      this._user = user;
                                      this.store.dispatch(authActions.setUser({ user }));
                                      
                                    })
              
      }else{
        // no existe
        // console.log('Llamar unSetUser');
        this._user = null;
       this.userSubscription?.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
         this.store.dispatch( ingresoEgresoActions.unSetItems() );
           // cada vez que el estado de firebase cambie va purgar los items
          
      }
      
      
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
