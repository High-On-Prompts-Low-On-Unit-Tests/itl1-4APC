import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular/lazy';

import { ProjekteListePageRoutingModule } from './projekte-liste-routing.module';

import { ProjekteListePage } from './projekte-liste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    ProjekteListePageRoutingModule
  ],
  declarations: [ProjekteListePage]
})
export class ProjekteListePageModule {}
