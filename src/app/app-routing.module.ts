import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { canActivateUser } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
{path: 'menu',component : MenuComponent},
{ path: 'home', component: HomeComponent },
{ path: 'contact', component: ContactComponent  },
{ path: 'about', component: AboutComponent ,canActivate:[canActivateUser]},
{path: 'register' ,component: RegisterFormComponent},
{path: 'login',component: LoginComponent},
{path: 'gallery',component: GalleryComponent,canActivate:[canActivateUser]},
{path: 'image/:id/:title',component: ImageComponent,canActivate:[canActivateUser]},
{ path: '',   redirectTo: '/home', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
