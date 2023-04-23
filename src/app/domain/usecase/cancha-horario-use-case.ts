import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanchaHorarioGateway } from '../models/gateway/cancha-horario.gateway';
import { CanchaHorarioDto } from '../models/cancha-horario';

@Injectable({
  providedIn: 'root',
})
export class CanchaHorarioUseCase {
  constructor(private _canchaHorarioGateway: CanchaHorarioGateway) {}

  crear(body: CanchaHorarioDto): Observable<CanchaHorarioDto> {
    return this._canchaHorarioGateway.crear(body);
  }

  actualizar(body: CanchaHorarioDto): Observable<CanchaHorarioDto>{
    return this._canchaHorarioGateway.actualizar(body);
  }

}