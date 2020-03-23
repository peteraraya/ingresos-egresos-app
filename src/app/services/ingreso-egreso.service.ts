import { Injectable } from "@angular/core";

import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgreso } from "../models/ingreso-egreso.model";
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;

    delete ingresoEgreso.uid;

    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  // Cuando queremos trabajar con datos externos lo ideal es trabajarlos en los servicios

  initIngresosEgresosListener(uid: string) {
    return this.firestore
               .collection(`${uid}/ingresos-egresos/items`)
                .snapshotChanges()
                  .pipe(
                    map( snapshot =>{
                       return snapshot.map( doc => {
                             // buscamos la data
                            //  console.log(doc.payload.doc.data());
                            // const data:Object = doc.payload.doc.data();
                             // transformar la información que quiera por cada uno de los elementos
                            return {
                              uid: doc.payload.doc.id,
                              // ...data
                              ...doc.payload.doc.data() as any
                            }; 
                       });
                    })
                  )
                
    // regresa un observable a travez del valueChanges
    }



    borrarIngresoEgreso(uidItem:string){
      // uid del usuario
       const uid = this.authService.user.uid;
        // este metodo borra y regresa una promesa
        return this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();


    }
}

// map() : permite tomar la respuesta  transformarla en lo que sea y retornar cualquier cosa que yo quiera
// el map tambien sirve para barrer cada uno de elementos de mi arreglo y retorna el objeto que coloquemos en el return