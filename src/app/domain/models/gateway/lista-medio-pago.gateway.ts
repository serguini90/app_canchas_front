import { Observable } from 'rxjs';
import { ListaMedioPagoDto } from '../lista-medio-pago';

export abstract class ListaMedioPagoGateway {
  abstract listarHabilitado(): Observable<ListaMedioPagoDto[]>;
}