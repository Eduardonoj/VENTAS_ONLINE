import { Component, OnInit } from '@angular/core';
import { ProductoService } from './service/producto.service';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { ModalProductoService } from './modal-producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[];
  productoSeleccionado: Producto;

  constructor(private productoService: ProductoService, private modalProductoService: ModalProductoService)  {}

  ngOnInit() {
   this.productoService.getProductos().subscribe((data: any) => this.productos = data);
  }

  delete(producto: Producto): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: 'Está Seguro de eliminar el registro',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor:'D33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true})
      .then((result) => {
        this.productoService.delete(producto.codigoProducto)
        .subscribe(
          () =>{
            this.productos = this.productos.filter(prod => prod !== producto)
            Swal.fire('Producto eliminado!',
            `Producto ${producto.descripcion} eliminado con éxito`,
            'success');
          }
        );
      });
  }

  abrirModal(producto: Producto){
    this.productoSeleccionado = producto;
    this.modalProductoService.abrirModal();
  }

}
