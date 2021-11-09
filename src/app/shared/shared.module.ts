import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavHeaderComponent } from './nav-header/nav-header.component';

@NgModule({
  declarations: [NavHeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, NavHeaderComponent],
})
export class SharedModule {}
