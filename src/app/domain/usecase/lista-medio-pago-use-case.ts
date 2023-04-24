import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaMedioPagoDto } from '../models/lista-medio-pago';
import { ListaMedioPagoService } from 'src/app/infraestructure/lista-medio-pago.service';

@Injectable({
  providedIn: 'root',
})
export class ListaMedioPagoUseCase {
  constructor(private _listaGateway: ListaMedioPagoService) {}

  listar(): Observable<ListaMedioPagoDto[]> {
    return this._listaGateway.listarHabilitado();
  }

}