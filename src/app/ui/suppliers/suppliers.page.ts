import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NewSuppliersPage } from './components/new-suppliers/new-suppliers.page';
import { EditSuppliersPage } from './components/edit-suppliers/edit-suppliers.page';
import { ModalController } from '@ionic/angular';
import { TabsFooterPage } from '../tabs-footer/tabs-footer.page';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, NewSuppliersPage,EditSuppliersPage, TabsFooterPage]
})
export class SuppliersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cancel(type: string) {
    this.modalController.dismiss(null, 'cancel',type);
  }

  confirm(type:string) {
    this.modalController.dismiss('prueba', 'confirm',type);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
     
    }
  }

}
