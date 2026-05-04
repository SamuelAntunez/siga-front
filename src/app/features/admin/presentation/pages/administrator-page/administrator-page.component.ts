import { Component } from '@angular/core';
import { GridMenuCardComponent } from '../../../../../shared/components/grid-menu-card/grid-menu-card.component';
import {
  MenuOptionsModalComponent,
  MenuOption,
} from '../../../../../shared/components/menu-options-modal/menu-options-modal.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-administrator-page',
  standalone: true,
  imports: [GridMenuCardComponent, MenuOptionsModalComponent, PageHeaderComponent, RouterLink],
  templateUrl: './administrator-page.component.html',
})
export class AdministratorPageComponent {
  userOptions: MenuOption[] = [
    {
      label: 'Gestión de Usuarios',
      description: 'Ver, editar y eliminar usuarios del sistema.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      route: '/home/administrador/usuarios',
    },
    {
      label: 'Roles y Permisos',
      description: 'Configurar permisos específicos para cada tipo de rol.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      route: '/home/administrador/roles',
    },
    {
      label: 'Auditoría de Accesos',
      description: 'Consultar el historial de inicios de sesión y actividad.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      route: '/home/administrador/auditoria',
    },
  ];
}
