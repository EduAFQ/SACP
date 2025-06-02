import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'; 
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-reserva',
  standalone:false,
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'] 
})
export class ReservaComponent {
  nombre = '';
  cedula = '';
  carro = '';
  placa = '';
  fechaReserva = '';

  constructor(private usuarioService: UsuarioService) {}

  guardarReserva() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      const usuarioEncontrado = usuarios.find(us =>
        us.Nombre === this.nombre &&
        us.Cedula === this.cedula &&
        us.Carro === this.carro &&
        us.Placa === this.placa
      );

      if (usuarioEncontrado) {
        const usuarioActualizado: Usuario = {
          ...usuarioEncontrado,
          Reserva: new Date(this.fechaReserva), // conversión a Date
        };

        console.log('Objeto que se envía al backend:', usuarioActualizado);

        this.usuarioService.putUsuario(usuarioActualizado.id, usuarioActualizado).subscribe(() => {
          Swal.fire('Reserva realizada', 'La reserva fue actualizada correctamente', 'success');
        }, () => {
          Swal.fire('Error', 'No se pudo actualizar la reserva', 'error');
        });
      } else {
        Swal.fire('No encontrado', 'No se encontró un usuario con esos datos', 'warning');
      }
    });
  }
}