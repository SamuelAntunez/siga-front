import { Component } from '@angular/core';
import { PageHeaderComponent } from '../components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  template: `
    <div class="max-w-7xl mx-auto">
      <app-page-header
        title="Panel"
        highlight="Principal"
        subtitle="Bienvenido al Sistema Integrado de Gestión Administrativa. Seleccione un módulo para comenzar."
      />

      <!-- Stats Quick View -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="stat shadow-sm bg-base-100 rounded-3xl border border-base-200 p-6">
          <div class="stat-title font-bold">Nóminas</div>
          <div class="stat-value text-primary">200</div>
          <div class="stat-desc font-medium">Activas este mes</div>
        </div>
        <div class="stat shadow-sm bg-base-100 rounded-3xl border border-base-200 p-6">
          <div class="stat-title font-bold">Profesores</div>
          <div class="stat-value text-secondary">45</div>
          <div class="stat-desc font-medium">Plantilla total</div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
