import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { CanchaDto } from 'src/app/domain/models/cancha';
import { CanchaHorarioDto } from 'src/app/domain/models/cancha-horario';
import { ListaMedioPagoDto } from 'src/app/domain/models/lista-medio-pago';
import { CanchaHorarioUseCase } from 'src/app/domain/usecase/cancha-horario-use-case';
import { CanchaUseCase } from 'src/app/domain/usecase/cancha-use-case';
import { ListaMedioPagoUseCase } from 'src/app/domain/usecase/lista-medio-pago-use-case';
import { ReservaUseCase } from 'src/app/domain/usecase/reserva-use-case';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';

@Component({
  selector: 'app-booking-crear',
  templateUrl: './booking-crear.component.html',
  styleUrls: ['./booking-crear.component.scss'],
})
export class BookingCrearComponent implements OnInit {

  loading: any;
  lisMetodosPago: ListaMedioPagoDto[] = [];
  lisCanchas: CanchaDto[] = [];
  lisHorarios: CanchaHorarioDto[] = [];
  formulario: FormGroup = {} as any;
  submitted = false;
  abrirAlert = false;
  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.abrirAlert = false;
      }
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => { this.salir(); }
    }
  ];
  cargando = true;
  minDate?: string;

  constructor(private modalCtrl: ModalController,
    private readonly reservaCasoUso: ReservaUseCase,
    private readonly preferenceService: PreferencesService,
    private readonly lisMedioPagoUso: ListaMedioPagoUseCase,
    private readonly canchaUso: CanchaUseCase,
    private readonly canchaHorarioUso: CanchaHorarioUseCase,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.minDate = new Date().toISOString();
    await this.mostarLoading();
    const [lisMetodosPago, lisCanchas] = await forkJoin(this.lisMedioPagoUso.listar(),
    this.canchaUso.listarCanchaHabilitado()).toPromise() || [[],[]];
    this.lisCanchas = lisCanchas || [];
    this.lisMetodosPago = lisMetodosPago || [];
    this.cargarFormulario();
    this.cargando = false;
    await this.loading.dismiss();
  }

  cargarFormulario(){
    this.formulario = this.fb.group({
      idCanchaHorario: [null, [Validators.required]],
      idCancha: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      idMedioPago: [null, [Validators.required]]
    });
  }

  get f(){
    return this.formulario.controls;
  }

  async cargarListadoHorarios(){
    if(!this.f['idCancha'].value || !this.f['fecha'].value) return;
    await this.mostarLoading();
    this.f['idCanchaHorario'].setValue(null);
    const objeto = {} as any;
    objeto.fecha = this.f['fecha'].value;
    this.lisHorarios = await this.canchaHorarioUso.getHorariosByCanchaLibre(this.f['idCancha'].value, objeto).toPromise() || [];
    await this.loading.dismiss();
  }

  seleccionar(canchaHorario: CanchaHorarioDto){
    if(!canchaHorario || canchaHorario.indicadorLibre === '0') return;
    this.f['idCanchaHorario'].setValue(canchaHorario.idCanchaHorario);
    this.f['idCanchaHorario'].markAsDirty();
  }

  salir(data?: any){
    return this.modalCtrl.dismiss(data);
  }

  async mostarLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async guardar(){
    this.submitted = true;
    if(!this.formulario.valid) return;
    await this.mostarLoading();
    const data = this.formulario.value;
    data.idUsuario = await this.preferenceService.getItem('idUsuario') ?? '';
    data.indicadorHabilitado = true;
    await this.reservaCasoUso.crear(data).toPromise();
    await this.loading.dismiss();
    this.salir(true);
  }

  regresar(){
    this.abrirAlert = true;
  }

}
