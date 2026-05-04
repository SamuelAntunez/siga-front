import { Component } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-footer-form',
  standalone: true,
  imports: [],
  templateUrl: './footer-form.html',
})
export class FooterFormComponent {
  envs = environment;
}
