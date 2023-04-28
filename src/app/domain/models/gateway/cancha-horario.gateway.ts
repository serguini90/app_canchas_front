import { Observable } from 'rxjs';
import { CanchaHorarioDto } from '../cancha-horario';

export abstract class CanchaHorarioGateway {
  abstract crear(body: CanchaHorarioDto): Observable<CanchaHorarioDto>;
  abstract actualizar(body: CanchaHorarioDto): Observable<CanchaHorarioDto>;
  abstract getHorariosByCancha(idCancha:string): Observable<CanchaHorarioDto[]>;
}
