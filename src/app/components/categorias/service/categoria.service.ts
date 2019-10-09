import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Categoria } from '../categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private API_URL = 'https://localhost:44331/api/v1';

  constructor(private _httpCliente: HttpClient) { }

  getData(url: string){
    return this._httpCliente.get<Categoria[]>(`${this.API_URL}/Categorias`);
      }
      getCategorias(){
        return this.getData('Categorias');
      }
}
