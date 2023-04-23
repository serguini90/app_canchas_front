import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaGateway } from '../models/gateway/reserva.gateway';
import { ReservaDto } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaUseCase {
  constructor(private _reservaGateway: ReservaGateway) {}

  crear(body: ReservaDto): Observable<ReservaDto> {
    return this._reservaGateway.crear(body);
  }

  actualizar(body: ReservaDto): Observable<ReservaDto>{
    return this._reservaGateway.actualizar(body);
  }

}