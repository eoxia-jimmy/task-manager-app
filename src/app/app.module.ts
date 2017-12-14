import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';

import { AppsComponent } from './components/apps/apps.component';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';

import { AppService } from './services/app/app.service';
import { HttpService } from './services/http/http.service';
import { AuthDataService } from './services/auth-data/auth-data.service';
import { TaskService } from './services/task/task.service';
import { PointService } from './services/point/point.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppsComponent,
    LoginComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
		HttpClientModule
  ],
  providers: [
		ElectronService,
		AppService,
		HttpService,
		AuthDataService,
		TaskService,
		PointService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
