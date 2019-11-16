import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './_helpers';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule } from 'ng-angular8-datatable';


import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { CompanyHomeComponent } from './components/company/company-home/company-home.component';
import { CommentboxComponent } from './components/company/company-home/commentbox/commentbox.component';
import { CommentsComponent } from './components/company/company-home/commentbox/comments/comments.component';
import { ChildboxComponent } from './components/company/company-home/commentbox/childbox/childbox.component';
import { CompanyDetailsComponent } from './components/company/company-details/company-details.component';
import { UserConnnectionsComponent } from './components/user/user-connnections/user-connnections.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    UserProfileComponent,
    CompanyHomeComponent,
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent,
    CompanyDetailsComponent,
    UserConnnectionsComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
