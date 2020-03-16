import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// SweetAlert
import Swal from "sweetalert2";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( 
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  login(){

    if (this.loginForm.invalid) {
      return;  
    }
Swal.fire({
  title: "Espere por favor",
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading();
    }});
    const { email, password } = this.loginForm.value;

    this.authService
      .loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(["/"]); // si hago un usuario correcto me lleva directamente al login
      })
      .catch(err =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          
        })
      );

  }

}
