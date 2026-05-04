import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralMenuComponent } from '../../../../shared/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, LateralMenuComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
