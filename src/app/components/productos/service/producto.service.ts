import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { catchError, map } from 'rxjs/operators';
import { ProductoCreacionDTO } from '../producto-creacion-dto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint = 'https://localhost:44331/api/v1';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getProductos(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.urlEndPoint}/Productos`);

  }

  getCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.urlEndPoint}/Categorias`);
  }

  getTipoEmpaques(): Observable<TipoEmpaque[]>{
    return this.httpClient.get<TipoEmpaque[]>(`${this.urlEndPoint}/TipoEmpaques`);

  }

  create(producto: ProductoCreacionDTO): Observable<Producto>{
    return this.httpClient.post(`${this.urlEndPoint}/Productos`, producto)
    .pipe(
      map((response: any) => response as Producto),
      catchError(e =>{
        if(e.status === 400){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Producto> {
    return this.httpClient.delete<Producto>(`${this.urlEndPoint}/productos/${id}`)
    .pipe();
  }

  update(id: number, productoCreacionDTO: ProductoCreacionDTO): Observable<any>{
    return this.httpClient.put<any>(
      `${this.urlEndPoint}/productos/${id}`, productoCreacionDTO)
      .pipe(
        catchError(e => {
          if(e.status === 400){
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  getProducto(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(`${this.urlEndPoint}/productos/${id}`)
    .pipe(
      catchError(e => {
        if(e.status !== 401) {
          this.router.navigate(['/productos']);
        }
        return throwError(e);
      })
    )
  }
}
