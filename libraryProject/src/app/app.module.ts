import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms' ;
import { NgxPaginationModule } from 'ngx-pagination' ; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoadContentComponent } from './load-content/load-content.component';
import { AddContentComponent } from './add-content/add-content.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { Routes, RouterModule } from '@angular/router' ;
import { BookService } from './shared/services/book.service' ;
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AddEditGuardService } from './guards/add-edit-guard.service';
import { WarningComponent } from './warning/warning.component';
import { UploadFileService } from './shared/services/upload-file.service';
import { FilterPipe } from './load-content/filterPipe';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserService } from './shared/services/user.service';
import { LoadUsersComponent } from './load-users/load-users.component';


const appRoutes : Routes = [ 
  { path: '', component: LoginComponent},
  { path: 'editBook', component: EditContentComponent, canActivate: [AddEditGuardService] } , 
  { path: 'addBook', component: AddContentComponent, canActivate: [AddEditGuardService] }, 
  { path: 'loadBooks', component: LoadContentComponent, canActivate: [AuthGuardService] 
},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'loadUsers', component: LoadUsersComponent},
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService] },
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
    RegisterComponent,
    FilterPipe,
    WarningComponent,
    EditProfileComponent,
    LoadUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [
    BookService, 
    AuthenticationService, 
    AuthGuardService, 
    AddEditGuardService, 
    UploadFileService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
