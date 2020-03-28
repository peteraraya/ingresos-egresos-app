import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate(["/login"]);
        }
      }),
      take(1) // se genera la primera vez se cancela la subscripcion
    );
  }
  // Protegerá nuestras rutas cuando se entre a la aplicación
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate(["/login"]);
        }
      })
    );
  }
}
