import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// SweetAlert 2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( 
              private fb: FormBuilder,
              private authService:AuthService,
              private router: Router
    
    ) { }

  ngOnInit() {
    // Creamos definición de mi formulario

    this.registroForm = this.fb.group({
      nombre:   ['',  Validators.required],
      correo:   ['',  [Validators.required, Validators.email]],
      password: ['',  Validators.required],
    })
  }
  
  
  crearUsuario(){
    // Validación
    if ( this.registroForm.invalid) {return;}

    const { nombre, correo, password } = this.registroForm.value;
    
    this.authService.crearUsuario(nombre,correo,password)
      .then(credenciales =>{
          console.log(credenciales);
          this.router.navigate(['/']); // si hago un usuario correcto me lleva directamente al login
      })
      .catch(err =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          
        })
      );


      // console.log(this.registroForm);
      // console.log(this.registroForm.valid);
      // console.log(this.registroForm.value);

    }
  }


