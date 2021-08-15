import { MaterialModule } from './../material/material.module';
import { AppRoutingModule } from './../../app-routing.module';
import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule, AppRoutingModule, MaterialModule,
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent]
})
export class MenuModule { }
