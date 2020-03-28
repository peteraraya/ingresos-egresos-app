import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Formularios Reactivos
import { ReactiveFormsModule } from '@angular/forms';
// Charts
import { ChartsModule } from 'ng2-charts';
// Modulos
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
// Rutas
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

// Este será el modulo que se cargará con lazyload

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule {}
