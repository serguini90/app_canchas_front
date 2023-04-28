import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanchaHorarioDto } from '../models/cancha-horario';
import { CanchaHorarioService } from 'src/app/infraestructure/cancha-horario.service';

@Injectable({
  providedIn: 'root',
})
export class CanchaHorarioUseCase {
  constructor(private _canchaHorarioGateway: CanchaHorarioService) {}

  crear(body: CanchaHorarioDto): Observable<CanchaHorarioDto> {
    return this._canchaHorarioGateway.crear(body);
  }

  actualizar(body: CanchaHorarioDto): Observable<CanchaHorarioDto>{
    return this._canchaHorarioGateway.actualizar(body);
  }

  getHorariosByCancha(idCancha:string): Observable<CanchaHorarioDto[]>{
    return this._canchaHorarioGateway.getHorariosByCancha(idCancha);
  }

}