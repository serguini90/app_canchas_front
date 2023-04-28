import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalController } from '@ionic/angular';
import { CanchaDto } from 'src/app/domain/models/cancha';
import { CanchaUseCase } from 'src/app/domain/usecase/cancha-use-case';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  loading: any;
  canchas: CanchaDto[] = [];

  constructor(
    private modalController: ModalController,
    private readonly _canchaUseCase: CanchaUseCase,
    private readonly preferenceService: PreferencesService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    await this.mostarLoading();
    const idUsuario = (await this.preferenceService.getItem('idUsuario')) ?? '';
    await this._canchaUseCase.listarCancha(idUsuario).subscribe((res) => {
      this.canchas = res;
    });
    await this.loading.dismiss();
  }

  async mostarLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await this.loading.present();
  }

  cancel(type: string) {
    this.modalController.dismiss(null, 'cancel', type);
  }

  confirm(type: string) {
    this.modalController.dismiss('ok', 'confirm', type);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.getAll();
    }
  }
}
