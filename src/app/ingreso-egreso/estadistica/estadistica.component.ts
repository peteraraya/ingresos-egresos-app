import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = [
    "Ingresos",
    "Egresos",
  ];
  public doughnutChartData: MultiDataSet = [
    [],
  ];
  public doughnutChartType: ChartType = "doughnut";

  constructor(private store: Store<AppStateWithIngreso>) {}

  ngOnInit() {
    this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    // Inicialización de los valores necesario para evitar errores
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if (item.tipo === "ingreso") {
        this.totalIngresos += item.monto; // valor acumulado
        this.ingresos++; // conteo
      } else {
        this.totalEgresos += item.monto; // valor acumulados
        this.egresos++; // conteo
      }
    }

    this.doughnutChartData = [ [this.totalIngresos, this.totalEgresos] ];
  }
}
