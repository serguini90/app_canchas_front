import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CanchaUseCase } from 'src/app/domain/usecase/cancha-use-case';
import { CanchaDto } from 'src/app/domain/models/cancha';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';

@Component({
  selector: 'app-edit-suppliers',
  templateUrl: './edit-suppliers.page.html',
  styleUrls: ['./edit-suppliers.page.scss'],
})
export class EditSuppliersPage implements OnInit {
  @Output() ejecutarFuncion = new EventEmitter<void>();
  @Input() public idCancha: string = '';
  canchaForm: FormGroup;
  idUsuario: string = '';
  isAlertOpen = false;
  alertButtons = ['OK'];
  MessageAlert = '';
  StatusAlert = '';
  constructor(
    public fb: FormBuilder,
    private readonly _canchaUseCase: CanchaUseCase,
    private readonly preferenceService: PreferencesService
  ) {
    this.canchaForm = this.fb.group({
      cantidadJugadores: ['', Validators.required],
      precio: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(6),
          Validators.pattern('[0-9]{5,6}$'),
        ],
      ],
      direccion: ['', Validators.required],
      indicadorHabilitado: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.idUsuario = (await this.preferenceService.getItem('idUsuario')) ?? '';
    this.getInfo();
  }

  getInfo() {
    this._canchaUseCase.getCanchaById(this.idCancha).subscribe((res) => {
      this.canchaForm.patchValue({
        cantidadJugadores: res.cantidadJugadores,
        precio: res.precio,
        direccion: res.direccion,
        indicadorHabilitado: res.indicadorHabilitado,
      });
    });
  }

  onSubmit() {
    if (!this.canchaForm.valid) {
      this.canchaForm.markAllAsTouched();
      return;
    }
    const form = this.canchaForm.value;
    const body: CanchaDto = {
      idCancha: this.idCancha,
      idUsuario: this.idUsuario,
      cantidadJugadores: form.cantidadJugadores,
      precio: form.precio,
      direccion: form.direccion,
      indicadorHabilitado: form.indicadorHabilitado,
    };
    this._canchaUseCase.actualizar(body).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        this.StatusAlert = 'Exito';
        this.MessageAlert = 'Cancha actualizada correctamente';
        this.isAlertOpen = true;
        this.ejecutarFuncion.emit();
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, por favor intente nuevamente';
        this.isAlertOpen = true;
        this.canchaForm.reset();
      }
    );
  }
}
