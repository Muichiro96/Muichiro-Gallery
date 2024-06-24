import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MacarouselComponent } from './macarousel/macarousel.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { PublicationService } from './publication.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NbIconModule, NbStatusService } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    MacarouselComponent,
    MenuComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    LoginComponent,
    GalleryComponent
  ],
  imports: [ CarouselModule.forRoot(),ModalModule.forRoot(),
    AppRoutingModule,ReactiveFormsModule,CommonModule,BrowserModule
  ],
  providers: [
    AuthService,PublicationService,provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
