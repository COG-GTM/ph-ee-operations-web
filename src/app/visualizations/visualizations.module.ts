import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationsComponent } from './visualizations/visualizations.component';
import { VisualizationsRoutingModule } from './visualizations-routing.module';
import { VisualizationsSelectorComponent } from './visualizations-selector/visualizations-selector.component';

import { SharedModule } from 'app/shared/shared.module';

/**
 * Visualizations Module.
 * 
 * Contains all visualizations components and modules.
 */
@NgModule({
    imports: [
    VisualizationsRoutingModule,
    CommonModule,
    SharedModule,
    VisualizationsComponent,
    VisualizationsSelectorComponent
]
})
export class VisualizationsModule { }
