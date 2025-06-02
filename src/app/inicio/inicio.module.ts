import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './reserva/reserva.component';
import { FormsModule } from '@angular/forms'; // ✅ Agregado

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    ReservaComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // ✅ Agregado
    RouterModule.forChild(ROUTES)
  ]
})
export class InicioModule { }
