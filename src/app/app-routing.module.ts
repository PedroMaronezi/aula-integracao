import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegracaoComponent } from './integracao/integracao.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'integracao',
    component: IntegracaoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
