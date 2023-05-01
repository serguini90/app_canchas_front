import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { ReservaUseCase } from 'src/app/domain/usecase/reserva-use-case';
import { ReservaDto } from 'src/app/domain/models/reserva';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';
import { BookingCrearComponent } from './booking-crear/booking-crear.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit {

  loading: any;
  reservas: ReservaDto[] = [];
  abrirAlert = false;
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.abrirAlert = false;
      }
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => { this.eliminarItem() }
    }
  ];
  itemSeleccionado?: ReservaDto;

  constructor(private readonly reservaCasoUso: ReservaUseCase,
    private readonly preferenceService: PreferencesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.cargarReservas();
  }

  async crear(){
    const modal = await this.modalCtrl.create({
      component: BookingCrearComponent,
    });
    modal.present();
    const respuesta = await modal.onWillDismiss();
    if(respuesta && respuesta.data){
      this.cargarReservas();
    }
  }

  eliminar(item: ReservaDto){
    this.itemSeleccionado = item;
    this.abrirAlert = true;
  }

  async cargarReservas(){
    await this.mostarLoading();
    const idUsuario = await this.preferenceService.getItem('idUsuario') ?? '';
    this.reservas = await this.reservaCasoUso.cargarReservas(idUsuario).toPromise() || [];
    await this.loading.dismiss();
  }

  async mostarLoading(){
      this.loading = await this.loadingCtrl.create({
        message: 'Cargando...'
      });
      await this.loading.present();
  }

  async eliminarItem(){
    this.abrirAlert = false;
    if(!this.itemSeleccionado) return;
    await this.mostarLoading();
    this.itemSeleccionado.indicadorHabilitado = false;
    await this.reservaCasoUso.actualizar(this.itemSeleccionado).toPromise();
    await this.loading.dismiss();
    this.cargarReservas();
  }

}
