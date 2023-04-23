import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaMedioPagoGateway } from '../models/gateway/lista-medio-pago.gateway';
import { ListaMedioPagoDto } from '../models/lista-medio-pago';

@Injectable({
  providedIn: 'root',
})
export class ListaMedioPagoUseCase {
  constructor(private _listaGateway: ListaMedioPagoGateway) {}

  listar(): Observable<ListaMedioPagoDto[]> {
    return this._listaGateway.listarHabilitado();
  }

}