import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanchaUseCase } from 'src/app/domain/usecase/cancha-use-case';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.page.html',
  styleUrls: ['./new-suppliers.page.scss'],
})
export class NewSuppliersPage implements OnInit {
  @Output() ejecutarFuncion = new EventEmitter<void>();
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
    });
  }

  async ngOnInit() {
    this.idUsuario = (await this.preferenceService.getItem('idUsuario')) ?? '';
  }

  onSubmit() {
    if (!this.canchaForm.valid) {
      this.canchaForm.markAllAsTouched();
      return;
    }
    const form = this.canchaForm.value;
    const body: any = {
      idUsuario: this.idUsuario,
      cantidadJugadores: form.cantidadJugadores,
      precio: form.precio,
      direccion: form.direccion,
      indicadorHabilitado: true,
    };
    this._canchaUseCase.crear(body).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        this.StatusAlert = 'Exito';
        this.MessageAlert = 'Cancha creada correctamente';
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
