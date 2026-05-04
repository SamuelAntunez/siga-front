import { User } from '../../domain/interfaces/user.interface';

export class AdminMapper {
  static getPrettyRole(role: string): string {
    const roleMap: { [key: string]: string } = {
      'SUPER_ADMIN_ROLE': 'Administrador',
      'ADMIN_ROLE': 'Administrador',
      'USER_ROLE': 'Usuario',
    };
    return roleMap[role] || role;
  }

  static userEntityToPresentation(user: User): User {
    return {
      ...user,
      displayRoles: user.role.map((role) => this.getPrettyRole(role)),
    };
  }

  static mapPaginatedUsers(response: any): any {
    return {
      ...response,
      users: response.users.map((user: User) => this.userEntityToPresentation(user)),
    };
  }
}
