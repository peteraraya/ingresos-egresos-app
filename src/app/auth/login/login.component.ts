import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// NGrx
import { AppState } from '../../app.redurcer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';

// SweetAlert
import Swal from "sweetalert2";

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit , OnDestroy{

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor( 
              private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router
              ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  // asignamos una subscription para poder hacer esta limpieza
  this.uiSubscription =   this.store.select('ui').subscribe( ui => {
                            this.cargando = ui.isLoading
                            console.log('cargando subs');
                          });

  }

  ngOnDestroy(){
    // Lugar para hacer limpieza de subcripciones
    this.uiSubscription.unsubscribe();
  }

  login(){

       if (this.loginForm.invalid) {
         return;
       }

       this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: "Espere por favor",
    //   timerProgressBar: true,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //     }});
    const { email, password } = this.loginForm.value;

    this.authService
      .loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(["/"]); // si hago un usuario correcto me lleva directamente al login
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      });


  }

}
