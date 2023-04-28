import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanchaHorarioUseCase } from 'src/app/domain/usecase/cancha-horario-use-case';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';
import { DatePipe } from '@angular/common';
import { CanchaHorarioDto } from 'src/app/domain/models/cancha-horario';

@Component({
  selector: 'app-edit-schedules',
  templateUrl: './edit-schedules.page.html',
  styleUrls: ['./edit-schedules.page.scss'],
})
export class EditSchedulesPage implements OnInit {
  @Input() public idCancha: string = '';
  newHorarioForm: FormGroup;
  idUsuario: string = '';
  isAlertOpen = false;
  alertButtons = ['OK'];
  MessageAlert = '';
  StatusAlert = '';
  listHorarios: CanchaHorarioDto[] = [];
  isModalOpen = false;
  horarioEdit!: CanchaHorarioDto;

  constructor(
    public fb: FormBuilder,
    private readonly _canchaHorarioUseCase: CanchaHorarioUseCase,
    private readonly preferenceService: PreferencesService
  ) {
    let fecha = new Date();
    const datePipe = new DatePipe('en-US');
    const fechaIniFormat =
      datePipe.transform(fecha, 'yyyy-MM-ddTHH:mm:ss') ?? '';
    this.newHorarioForm = this.fb.group({
      horaInicio: [fechaIniFormat],
      horaFin: [fechaIniFormat],
    });
  }

  async ngOnInit() {
    this.idUsuario = (await this.preferenceService.getItem('idUsuario')) ?? '';
    this.getAll();
  }

  getAll() {
    this._canchaHorarioUseCase
      .getHorariosByCancha(this.idCancha)
      .subscribe((res) => {
        this.listHorarios = res;
      });
  }

  onSubmitNew() {
    const form = this.newHorarioForm.value;
    const diferencia = this.diffHours(form.horaInicio, form.horaFin);
    console.log(diferencia);
    if (diferencia < 59) {
      this.StatusAlert = 'Error';
      this.MessageAlert = 'La diferencia entre horas debe ser de 1 hora';
      this.isAlertOpen = true;
      return;
    }
    const body: any = {
      idCancha: this.idCancha,
      horaInicio: form.horaInicio.slice(-8, -3),
      horaFin: form.horaFin.slice(-8, -3),
      indicadorHabilitado: true,
    };
    this._canchaHorarioUseCase.crear(body).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        this.StatusAlert = 'Exito';
        this.MessageAlert = 'Horario creado correctamente';
        this.isAlertOpen = true;
        this.getAll();
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, por favor intente nuevamente';
        this.isAlertOpen = true;
      }
    );
  }

  diffHours(fechaIni: string, fechaFin: string) {
    const diferenciaEnMs = Math.abs(
      new Date(fechaFin).getTime() - new Date(fechaIni).getTime()
    );
    const diferenciaEnMin = Math.floor(diferenciaEnMs / 60000);
    return diferenciaEnMin;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  editHorario(horario: CanchaHorarioDto) {
    this.horarioEdit = horario;
    this.setOpen(true);
  }

  onSubmitEdit() {
    this._canchaHorarioUseCase.actualizar(this.horarioEdit).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        this.StatusAlert = 'Exito';
        this.MessageAlert = 'Horario actualizado correctamente';
        this.isAlertOpen = true;
        this.setOpen(false);
        this.getAll();
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, por favor intente nuevamente';
        this.isAlertOpen = true;
      }
    );
  }
}
