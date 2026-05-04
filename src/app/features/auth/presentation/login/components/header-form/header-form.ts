import { Component } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-header-form',
  standalone: true,
  imports: [],
  templateUrl: './header-form.html',
})
export class HeaderFormComponent {
  envs = environment;
}
