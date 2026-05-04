import { Component, input, output, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      <div class="flex items-center gap-4">
        @if (showBackButton()) {
          <button (click)="goBack()" class="btn btn-ghost btn-circle hover:bg-base-200 transition-colors" title="Volver">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        }
        <div>
          <h1 class="text-4xl font-black text-base-content mb-2 tracking-tight">
            {{ title() }} <span class="text-primary">{{ highlight() }}</span>
          </h1>
          <p class="text-base-content/60 text-lg">
            {{ subtitle() }}
          </p>
        </div>
      </div>

      @if (buttonLabel()) {
        <button (click)="buttonClick.emit()" class="btn btn-primary rounded-xl px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <ng-content select="[icon]"></ng-content>
          {{ buttonLabel() }}
        </button>
      }
    </div>
  `,
})
export class PageHeaderComponent {
  private location = inject(Location);

  title = input.required<string>();
  highlight = input.required<string>();
  subtitle = input.required<string>();
  buttonLabel = input<string>();
  showBackButton = input<boolean>(false);
  
  buttonClick = output<void>();

  goBack() {
    this.location.back();
  }
}
