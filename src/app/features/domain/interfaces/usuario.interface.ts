export type Rol = ['superadmin', 'admin', 'usuario'];

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  roles: Rol[];
}
