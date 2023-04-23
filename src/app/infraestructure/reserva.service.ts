import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservaGateway } from '../domain/models/gateway/reserva.gateway';
import { ReservaDto } from '../domain/models/reserva';

@Injectable({
    providedIn: 'root'
})
export class ReservaService extends ReservaGateway {

    private _url = environment.serviceUrl + '/reserva';

    constructor(private http: HttpClient) {
        super();
    }

    override crear(body: ReservaDto): Observable<ReservaDto> {
        return this.http.post<ReservaDto>(this._url, body);
    }
    override actualizar(body: ReservaDto): Observable<ReservaDto> {
        return this.http.put<ReservaDto>(this._url, body);
    }


}
