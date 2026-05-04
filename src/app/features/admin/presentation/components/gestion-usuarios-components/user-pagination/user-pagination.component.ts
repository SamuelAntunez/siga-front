import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-user-pagination',
  standalone: true,
  template: `
    @if (totalItems() > itemsPerPage()) {
      <div class="flex justify-between items-center p-4 border-t border-base-200 bg-base-100">
        <span class="text-sm font-medium text-base-content/60">
          Mostrando pág {{ currentPage() }} de {{ totalPages() }}
        </span>
        <div class="join">
          <button 
            class="join-item btn btn-sm" 
            [disabled]="currentPage() === 1"
            (click)="pageChange.emit(currentPage() - 1)">
            «
          </button>
          <button class="join-item btn btn-sm">Pág {{ currentPage() }}</button>
          <button 
            class="join-item btn btn-sm" 
            [disabled]="currentPage() >= totalPages()"
            (click)="pageChange.emit(currentPage() + 1)">
            »
          </button>
        </div>
      </div>
    }
  `
})
export class UserPaginationComponent {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();
  
  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
}
