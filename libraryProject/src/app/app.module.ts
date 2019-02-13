import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms' ;
import { NgxPaginationModule } from 'ngx-pagination' ; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoadContentComponent } from './load-content/load-content.component';
import { AddContentComponent } from './add-content/add-content.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { Routes, RouterModule } from '@angular/router' ;
import { manageService } from './manageService.service' ;
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AddEditGuardService } from './add-edit-guard.service';

const appRoutes : Routes = [ 
  { path: '', component: LoginComponent},
  
  { path: 'editBook', component: EditContentComponent, canActivate: [AddEditGuardService] } , 
  { path: 'addBook', component: AddContentComponent, canActivate: [AddEditGuardService] }, 
  { path: 'loadBooks', component: LoadContentComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '' }
] ;
 

@NgModule({
  declarations: [
    AppComponent,
    LoadContentComponent,
    AddContentComponent,
    EditContentComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [manageService, AuthenticationService, AuthGuardService, AddEditGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
