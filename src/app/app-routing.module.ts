import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, terminal: true },
	{ path: 'login', component: LoginComponent, terminal: true }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, {useHash: true, enableTracing: true}) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
