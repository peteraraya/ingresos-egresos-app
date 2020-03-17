import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
         "[Auth] setUser",
         props<{ user: Usuario }>() // set user recibe una propiedad de tipo usuario
       );
export const unSetUser = createAction("[Auth] unSetUser");
