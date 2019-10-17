import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { TipoEmpaqueService } from '../../tipo-empaques/service/tipo-empaque.service';
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
titulo: string;
producto: Producto = new Producto();
categorias: Categoria[];
tipoEmpaques: TipoEmpaque[]= [];
  constructor(
    private categoriaService: CategoriaService, 
    private tipoEmpaqueService: TipoEmpaqueService,
    private productoService: ProductoService,
    private router: Router) { }


  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this.tipoEmpaqueService.getTipoEmpaques().subscribe(tipoEmpaques => this.tipoEmpaques = tipoEmpaques);
  }

  create(): void {
    this.producto.codigoCategoria = this.producto.categoria.codigoCategoria;
    this.producto.codigoEmpaque = this.producto.tipoEmpaque.codigoEmpaque;
    this.productoService.create(this.producto).subscribe(
      producto => {
        this.router.navigate(['/Productos']);
       Swal.fire('Nuevo Producto',
        `El producto ${this.producto.descripcion} ha sido creado con exito!!!`,
        'success');
      },
      error => {
        Swal.fire('Nuevo producto', `Error code ${error.status}`, 'error');
      }
    );
  }

}
