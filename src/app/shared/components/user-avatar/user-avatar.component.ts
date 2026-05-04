import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar placeholder">
      <div 
        [class]="'bg-primary text-primary-content rounded-full flex items-center justify-center ' + sizeClass()"
      >
        <span [class]="'uppercase font-bold ' + textClass()">{{ initial() }}</span>
      </div>
    </div>
  `
})
export class UserAvatarComponent {
  name = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

  initial = computed(() => this.name().charAt(0));

  sizeClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      default: return 'w-10 h-10';
    }
  });

  textClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-xl';
      default: return 'text-lg';
    }
  });
}
