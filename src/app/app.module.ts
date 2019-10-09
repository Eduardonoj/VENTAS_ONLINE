import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { APP_ROUTING } from './app.routes';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaService} from './components/categorias/service/categoria.service';
import { TipoEmpaquesComponent} from './components/tipo-empaques/tipo-empaques.component';
import { TipoEmpaqueService} from './components/tipo-empaques/service/tipo-empaque.service';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoService } from './components/productos/service/producto.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor} from './components/login/interceptors/token.interceptor';
import { AuthInterceptor } from './components/login/interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ModulosComponent,
    CategoriasComponent,
    LoginComponent,
    ProductosComponent,
    TipoEmpaquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CategoriaService,
  TipoEmpaqueService,
    ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
