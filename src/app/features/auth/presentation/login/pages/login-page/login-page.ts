import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { environment } from '../../../../../../../environments/environment';
import { HeaderFormComponent } from '../../components/header-form/header-form';
import { FooterFormComponent } from '../../components/footer-form/footer-form';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormComponent, HeaderFormComponent, FooterFormComponent],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {
  envs = environment;
}
