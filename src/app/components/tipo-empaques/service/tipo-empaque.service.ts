import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { TipoEmpaque } from '../tipo-empaque';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpaqueService {
  private API_URL = 'https://localhost:44331/api/v1';
  

  constructor(private _httpCliente: HttpClient) { }

  getData(url: string){
      
    return this._httpCliente.get<[TipoEmpaque]>(`${this.API_URL}/TipoEmpaques`);
  }
  getTipoEmpaques(){
    return this.getData('TipoEmpaques');
  }

}


