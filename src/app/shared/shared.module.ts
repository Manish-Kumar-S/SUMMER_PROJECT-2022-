import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { AdblockComponent } from './components/adblock/adblock.component';

@NgModule({
  declarations: [NavHeaderComponent, AdblockComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, NavHeaderComponent, AdblockComponent],
})
export class SharedModule {}
