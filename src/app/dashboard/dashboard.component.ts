import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService
            ) { }

  ngOnInit() {

   this.userSubs = this.store.select('user')
    // los observables los podermos pasar por un pipe que nos permite manipularlos, modificarlos etc
    .pipe(
      // filter() : permite establecer una condición que retorne un true o un false
      filter(auth => auth.user != null)// si regresa true lo deja pasar 
    )
    .subscribe( ({user}) => {
      console.log(user);
      
     this.ingresosSubs =   this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
           .subscribe( (ingresosEgresosFb:any) =>{
             console.log(ingresosEgresosFb);
             this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFb }))
           })
           

    });
  }

  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}


// cuando dejo el dashboard realizo la limpieza de los observables