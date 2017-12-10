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

import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { AuthDataService } from './services/auth-data/auth-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
		HttpClientModule
  ],
  providers: [ElectronService, AppService, AuthService, HttpService, AuthDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
