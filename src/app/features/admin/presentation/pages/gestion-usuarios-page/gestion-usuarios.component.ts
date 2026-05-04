import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../data/services/admin.service';
import { User } from '../../../domain/interfaces/user.interface';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { UserTableRowComponent } from '../../components/gestion-usuarios-components/user-table-row/user-table-row.component';
import { UserPaginationComponent } from '../../components/gestion-usuarios-components/user-pagination/user-pagination.component';
import { AddUserFormComponent } from '../../components/gestion-usuarios-components/add-user-form/add-user-form.component';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UserTableRowComponent, UserPaginationComponent, AddUserFormComponent],
  templateUrl: './gestion-usuarios.component.html',
})
export class GestionUsuariosComponent implements OnInit {
  private adminService = inject(AdminService);
  
  users = signal<User[]>([]);
  totalUsers = signal<number>(0);
  currentPage = signal<number>(1);
  limit = signal<number>(10);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  isModalOpen = signal<boolean>(false);
  userToEdit = signal<User | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.adminService.getUsers(this.currentPage(), this.limit()).subscribe({
      next: (response) => {
        this.users.set(response.users);
        this.totalUsers.set(response.total);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Error al cargar los usuarios.');
        this.isLoading.set(false);
      }
    });
  }

  changePage(page: number) {
    if (page < 1 || page > Math.ceil(this.totalUsers() / this.limit())) return;
    this.currentPage.set(page);
    this.loadUsers();
  }

  onEditUser(user: User) {
    this.userToEdit.set(user);
    this.isModalOpen.set(true);
  }

  onDeleteUser(user: User) {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.name}?`);
    
    if (confirmed) {
      this.isLoading.set(true);
      this.adminService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          // Podríamos agregar un mensaje de éxito aquí si tuviéramos un servicio de notificaciones
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set('Error al eliminar el usuario.');
          this.isLoading.set(false);
        }
      });
    }
  }

  openModal() {
    this.userToEdit.set(null);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.userToEdit.set(null);
    this.isModalOpen.set(false);
  }
}
