// Reducers global de nuestra aplicación

// Estado inicial de nuestra aplicación
import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer, // referencia a la interface de ui.reducers
   user: auth.authReducer
}