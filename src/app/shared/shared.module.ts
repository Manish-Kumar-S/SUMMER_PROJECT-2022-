import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { AdblockComponent } from './components/adblock/adblock.component';

@NgModule({
  declarations: [AdblockComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, AdblockComponent],
})
export class SharedModule {}
