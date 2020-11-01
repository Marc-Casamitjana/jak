import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './feature/chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './feature/users/users.component';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { ModalComponent } from './layout/modal/modal.component';
import { ModalDirective } from './core/directives/modal.directive';
import { HeaderComponent } from './layout/header/header.component';
import { SocialComponent } from './feature/social/social.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivatesComponent } from './feature/privates/privates.component';

const appRoutes: Routes = [
  { path: 'room', component: ChatComponent },
  { path: 'privates', component: PrivatesComponent },
  { path: 'social', component: SocialComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ChatComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ModalComponent,
    ModalDirective,
    HeaderComponent,
    SocialComponent,
    PrivatesComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent],
})
export class AppModule {}
