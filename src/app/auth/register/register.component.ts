import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// SweetAlert 2
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from "../../shared/ui.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  cargando: boolean = false;
  uiSubscription: Subscription;

  ngOnInit() {
    // Creamos definición de mi formulario

    this.registroForm = this.fb.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
        this.uiSubscription = this.store
          .select("ui")
          .subscribe(ui => (this.cargando = ui.isLoading));

  }
  ngOnDestroy() {
    // Lugar para hacer limpieza de subcripciones
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    // Validación
 
    if (this.registroForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());

    const { nombre, correo, password } = this.registroForm.value;

    this.authService
      .crearUsuario(nombre, correo, password)
      .then(credenciales => {
                              // Swal.close();
                              this.store.dispatch(ui.stopLoading());
                              this.router.navigate(["/"]); // si hago un usuario correcto me lleva directamente al login
                            })
        .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
      
      

    // console.log(this.registroForm);
    // console.log(this.registroForm.valid);
    // console.log(this.registroForm.value);
  }
}



