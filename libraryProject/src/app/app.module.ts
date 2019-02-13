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
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
const appRoutes : Routes = [ 
  { path: '', component: LoginComponent},
  { path: 'editBook', component: EditContentComponent} , 
  { path: 'addBook', component: AddContentComponent }, 
  { path: 'loadBooks', component: LoadContentComponent},
  { path: 'register', component: RegisterComponent}
] ;

@NgModule({
  declarations: [
    AppComponent,
    LoadContentComponent,
    AddContentComponent,
    EditContentComponent,
    LoginComponent,
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
  providers: [manageService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
