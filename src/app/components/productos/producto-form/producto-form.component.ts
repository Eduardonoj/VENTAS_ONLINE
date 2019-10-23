import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { TipoEmpaqueService } from '../../tipo-empaques/service/tipo-empaque.service';
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { ProductoService } from '../service/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoCreacionDTO } from '../producto-creacion-dto';
import { ModalProductoService } from '../modal-producto.service';






@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
titulo: string;
@Input() producto: ProductoCreacionDTO;
@Input() id: number;
categorias: Categoria[];
tipoEmpaques: TipoEmpaque[]= [];
productoDTO: ProductoCreacionDTO = new ProductoCreacionDTO();


  constructor(
    private categoriaService: CategoriaService, 
    private tipoEmpaqueService: TipoEmpaqueService,
    private productoService: ProductoService,
    private router: Router,
    private modalProductoService: ModalProductoService) { }


  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this.tipoEmpaqueService.getTipoEmpaques().subscribe(tipoEmpaques => this.tipoEmpaques = tipoEmpaques);
  }

  create(): void {
    console.log(this.productoDTO);
    this.productoService.create(this.productoDTO).subscribe(
      producto => {
        this.router.navigate(['/Productos']);
       Swal.fire('Nuevo Producto',
        `El producto ${this.producto.descripcion} ha sido creado con exito!!!`,
        'success');
        this.modalProductoService.cerrarModal();

      },
      error => {
        Swal.fire('Nuevo producto', `Error code ${error.status}`, 'error');
      }
    );
  }

  update(): void {
    this.productoService.update(this.id, this.producto).subscribe(
      producto =>{
      this.router.navigate(['/productos']);
      Swal.fire('Actualizar Producto', `El producto ${this.producto.descripcion} ha sido actualizado`,
      'success');
      this.modalProductoService.cerrarModal();
      this.producto = null;
    }
    );
  }
cerrarModal():void{
  this.modalProductoService.cerrarModal();
  this.producto = null;
}
}
