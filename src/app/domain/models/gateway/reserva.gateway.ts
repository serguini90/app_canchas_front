import { Observable } from 'rxjs';
import { ReservaDto } from '../reserva';


export abstract class ReservaGateway {
  abstract crear(body: ReservaDto): Observable<ReservaDto>;
  abstract actualizar(body: ReservaDto): Observable<ReservaDto>;
  abstract listarMisReservas(idUsuario: string): Observable<ReservaDto[]>;
}