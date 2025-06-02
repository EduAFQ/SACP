import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'usuarios',
    loadChildren:()=>import('./usuario/usuario.module').then(m=>m.UsuarioModule)
  },
  { 
    path: 'inicio',
    loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
