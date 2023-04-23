import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CanchaGateway } from '../domain/models/gateway/cancha.gateway';
import { CanchaDto } from '../domain/models/cancha';
import { ListaMedioPagoGateway } from '../domain/models/gateway/lista-medio-pago.gateway';
import { ListaMedioPagoDto } from '../domain/models/lista-medio-pago';

@Injectable({
    providedIn: 'root'
})
export class ListaMedioPagoService extends ListaMedioPagoGateway {

    private _url = environment.serviceUrl + '/lista-medio-pago';

    constructor(private http: HttpClient) {
        super();
    }

    override listarHabilitado(): Observable<ListaMedioPagoDto[]> {
        return this.http.get<ListaMedioPagoDto[]>(this._url);
    }


}
