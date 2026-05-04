import { Component, input, output } from '@angular/core';
import { User } from '../../../../domain/interfaces/user.interface';
import { UserTableActionsComponent } from '../user-table-actions/user-table-actions.component';
import { UserAvatarComponent } from '../../../../../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: '[app-user-table-row]',
  standalone: true,
  imports: [UserTableActionsComponent, UserAvatarComponent],
  template: `
    <td class="py-4">
      <div class="flex items-center space-x-3">
        <app-user-avatar [name]="user().name" />
        <div>
          <div class="font-bold text-base">{{ user().name }}</div>
        </div>
      </div>
    </td>
    <td>
      <span class="text-sm">{{ user().email }}</span>
    </td>
    <td>
      <div class="flex gap-2 flex-wrap">
        @for (role of user().displayRoles || user().role; track role) {
          <div class="badge badge-primary badge-outline badge-sm font-semibold">{{ role }}</div>
        }
      </div>
    </td>
    <td class="">
      @if (user().emailValidate) {
        <div class="badge badge-success gap-1 text-xs text-success-content font-semibold">
          Validado
        </div>
      } @else {
        <div class="badge badge-warning gap-1 text-xs text-warning-content font-semibold">
          Pendiente
        </div>
      }
    </td>
    <td>
      <app-user-table-actions (edit)="edit.emit(user())" (delete)="delete.emit(user())" />
    </td>
  `,
})
export class UserTableRowComponent {
  user = input.required<User>();
  edit = output<User>();
  delete = output<User>();
}
