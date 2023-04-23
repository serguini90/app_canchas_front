import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanchaGateway } from '../models/gateway/cancha.gateway';
import { CanchaDto } from '../models/cancha';

@Injectable({
  providedIn: 'root',
})
export class CanchaUseCase {
  constructor(private _canchaGateway: CanchaGateway) {}

  crear(body: CanchaDto): Observable<CanchaDto> {
    return this._canchaGateway.crear(body);
  }

  actualizar(body: CanchaDto): Observable<CanchaDto>{
    return this._canchaGateway.actualizar(body);
  }

}