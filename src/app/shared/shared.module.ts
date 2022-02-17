import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { AdblockComponent } from './components/adblock/adblock.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdblockComponent, NavComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, AdblockComponent, NavComponent],
})
export class SharedModule {}
