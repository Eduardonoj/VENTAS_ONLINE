import { RouterModule, Routes} from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { ModulosComponent } from './components/modulos/modulos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { LoginComponent } from './components/login/login.component';
import {AuthguardGuard} from './components/login/guards/authguard.guard';
import { TipoEmpaquesComponent } from './components/tipo-empaques/tipo-empaques.component';
import { ProductosComponent } from './components/productos/productos.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthguardGuard]},
    {path: 'modulos', component: ModulosComponent},
    {path: 'categorias', component: CategoriasComponent, canActivate: [AuthguardGuard]},
    {path: 'tipo-empaques', component: TipoEmpaquesComponent, canActivate: [AuthguardGuard]},
    {path: 'productos', component: ProductosComponent, canActivate: [AuthguardGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
   
    
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});