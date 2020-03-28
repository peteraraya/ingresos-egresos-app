import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../services/auth.guard';

const rutasHijas: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
      // canActivate:[AuthGuard]
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports:[
    // angular dispone de esta nueva configuración
    RouterModule
  ]
})
export class DashboardRoutesModule { }
