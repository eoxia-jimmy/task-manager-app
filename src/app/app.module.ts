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

import { MenuComponent } from './components/menu/menu.component';
import { AppsComponent } from './components/apps/apps.component';
import { LoginComponent } from './components/login/login.component';

import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
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
  providers: [ElectronService, AppService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
