import { Observable } from 'rxjs';
import { CanchaDto } from '../cancha';

export abstract class CanchaGateway {
  abstract crear(body: CanchaDto): Observable<CanchaDto>;
  abstract actualizar(body: CanchaDto): Observable<CanchaDto>;
  abstract listarCanchas(idUsuario: string): Observable<CanchaDto[]>;
  abstract getCanchaById(idCancha: string): Observable<CanchaDto>;
}