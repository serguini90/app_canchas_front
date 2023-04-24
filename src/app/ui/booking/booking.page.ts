import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ReservaUseCase } from 'src/app/domain/usecase/reserva-use-case';
import { ReservaDto } from 'src/app/domain/models/reserva';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit {

  loading: any;
  reservas: ReservaDto[] = [];

  constructor(private readonly reservaCasoUso: ReservaUseCase,
    private readonly preferenceService: PreferencesService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
      await this.mostarLoading();
      const idUsuario = await this.preferenceService.getItem('idUsuario') ?? '';
      this.reservas = await this.reservaCasoUso.cargarReservas(idUsuario).toPromise() || [];
      await this.loading.dismiss();
  }

  crear(){}

  async mostarLoading(){
      this.loading = await this.loadingCtrl.create({
        message: 'Cargando...'
      });
      await this.loading.present();
  }

}
