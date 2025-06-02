import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  @ViewChild('cuModal') modal:ElementRef|undefined;
  VectorUser:Usuario[]=[
    
  ];

  isLoading=true;

  usuarioSeleccion: Usuario | undefined =undefined;
  isNew:boolean=false;
  constructor(private _usuarioService: UsuarioService, private _util: UtilityService){
    this.LoadUsuarios();
  }
  LoadUsuarios(){
    this.isLoading=true
    this._usuarioService.getUsuarios()
    .subscribe((rs)=>{
      this.VectorUser = rs;
      this.isLoading = false;
    })
  }
  editarUsuario(usuario:Usuario){
    this.isNew=false;
    this.usuarioSeleccion=usuario;
  }
  

  nuevoUsuario(){
    this.isNew=true;
    this.usuarioSeleccion = {Nombre: "",Carro: "",Cedula: "",Placa: "",Registro_Entrada:null ,Registro_Salida: null,Reserva: null
} as Usuario;
}
registrarEntrada(usuario: Usuario) {
  const usuarioActualizado = { ...usuario };
  usuarioActualizado.Registro_Entrada = new Date();

  this._usuarioService.putUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
    next: () => {
      Swal.fire({ icon: 'success', title: 'Entrada registrada correctamente' });
      this.LoadUsuarios(); // Refrescar la lista
    },
    error: () => {
      Swal.fire({ icon: 'error', title: 'Error al registrar la entrada' });
    }
  });
}
registrarSalida(usuario: Usuario) {
  const usuarioActualizado = { ...usuario };
  usuarioActualizado.Registro_Salida = new Date();

  this._usuarioService.putUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
    next: () => {
      Swal.fire({ icon: 'success', title: 'Salida registrada correctamente' });
      this.LoadUsuarios(); // Recargar datos actualizados
    },
    error: () => {
      Swal.fire({ icon: 'error', title: 'Error al registrar la salida' });
    }
  });
}

  
  guardarUsuario() {
  if (!this.usuarioSeleccion) return;

  if (this.isNew) {
    this._usuarioService.postUsuario(this.usuarioSeleccion).subscribe({
      next: (usuarioCreado) => {
        this.VectorUser.push(usuarioCreado);
        this.usuarioSeleccion = undefined;

        if (this.modal) this._util.cerrarModal(this.modal);

        Swal.fire({ icon: 'success', title: "Usuario creado correctamente" });
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error al crear usuario' });
      }
    });
  } else {
    this._usuarioService.putUsuario(this.usuarioSeleccion.id, this.usuarioSeleccion).subscribe({
      next: () => {
        this.usuarioSeleccion = undefined;

        if (this.modal) this._util.cerrarModal(this.modal);

        Swal.fire({ icon: 'success', title: "Usuario actualizado correctamente" });
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error al actualizar usuario' });
      }
    });
  }
}

  


  eliminarUsuario(us:Usuario){
    Swal.fire({
      icon:'question',
      title:"¿Estás seguro que deseas eliminar este usuario?",
      showCancelButton:true,
      showConfirmButton:true,
      cancelButtonText:"No",
      confirmButtonText:"Si",
      allowOutsideClick:false,

      customClass:{
        cancelButton:"btn btn-warning",
        confirmButton:"btn btn-danger"
      }
    })
    .then(rs=>{
      if(rs.isConfirmed){
          this._usuarioService.eliminarUsuario(us.id).subscribe({
  next: () => {
    Swal.fire({ icon: 'success', title: 'Usuario eliminado correctamente' })
  },
  error: () => {
    Swal.fire({ icon: 'error', title: 'Error al eliminar usuario' });
  }
});
    }
    })

}
}
