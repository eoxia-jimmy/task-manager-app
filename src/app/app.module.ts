import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { AppService } from './services/app/app.service';
import { HttpService } from './services/http/http.service';
import { AuthDataService } from './services/auth-data/auth-data.service';
import { TaskService } from './services/task/task.service';
import { PointService } from './services/point/point.service';
import { CategoryService } from './services/category/category.service';
import { Oauth10aService } from './services/oauth1.0a/oauth1.0a.service';
import { UserService } from './services/user/user.service';

import { MasonryDirective } from './directives/masonry/masonry.directive';
import { WpeoDropdownDirective } from './directives/wpeo-dropdown/wpeo-dropdown.directive';
import { FlextextDirective } from './directives/flextext/flextext.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppsComponent } from './components/apps/apps.component';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { PointComponent } from './components/point/point.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { TaskOptionComponent } from './components/task-option/task-option.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PointOptionComponent } from './components/point-option/point-option.component';
import { PointAddComponent } from './components/point-add/point-add.component';
import { OwnerComponent } from './components/owner/owner.component';
import { TimeHistoryComponent } from './components/time-history/time-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppsComponent,
    LoginComponent,
    TaskComponent,
    MasonryDirective,
    PointComponent,
    CategoryComponent,
    UserComponent,
    TaskOptionComponent,
    WpeoDropdownDirective,
    FlextextDirective,
    NavigationComponent,
    PointOptionComponent,
    PointAddComponent,
    OwnerComponent,
    TimeHistoryComponent
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
		PointService,
		CategoryService,
		Oauth10aService,
		UserService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
