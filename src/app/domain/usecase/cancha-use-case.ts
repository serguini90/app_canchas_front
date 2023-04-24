import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanchaDto } from '../models/cancha';
import { CanchaService } from 'src/app/infraestructure/cancha.service';

@Injectable({
  providedIn: 'root',
})
export class CanchaUseCase {
  constructor(private _canchaGateway: CanchaService) {}

  crear(body: CanchaDto): Observable<CanchaDto> {
    return this._canchaGateway.crear(body);
  }

  actualizar(body: CanchaDto): Observable<CanchaDto>{
    return this._canchaGateway.actualizar(body);
  }

}