import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SuppliersPage } from './suppliers.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewSuppliersPage } from './components/new-suppliers/new-suppliers.page';
import { EditSuppliersPage } from './components/edit-suppliers/edit-suppliers.page';
import { EditSchedulesPage } from './components/edit-schedules/edit-schedules.page';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: SuppliersPage }]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SuppliersPage,
    NewSuppliersPage,
    EditSuppliersPage,
    EditSchedulesPage,
  ],
  exports: [SuppliersPage],
})
export class SuppliersPageModule {}
