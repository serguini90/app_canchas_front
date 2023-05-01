import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CanchaGateway } from '../domain/models/gateway/cancha.gateway';
import { CanchaDto } from '../domain/models/cancha';

@Injectable({
    providedIn: 'root'
})
export class CanchaService extends CanchaGateway {

    private _url = environment.serviceUrl + '/cancha';

    constructor(private http: HttpClient) {
        super();
    }

    override crear(body: CanchaDto): Observable<CanchaDto> {
        return this.http.post<CanchaDto>(this._url, body);
    }
    override actualizar(body: CanchaDto): Observable<CanchaDto> {
        return this.http.put<CanchaDto>(this._url, body);
    }

    override listarCanchas(idUsuario: string): Observable<CanchaDto[]> {
        return this.http.get<CanchaDto[]>(this._url+'/usuario/'+idUsuario);
    }

    override listarCanchasHabilitado(): Observable<CanchaDto[]> {
        return this.http.get<CanchaDto[]>(this._url+'/enabled');
    }

    override getCanchaById(idCancha: string): Observable<CanchaDto> {
        return this.http.get<CanchaDto>(this._url+'/'+idCancha);
    }

}
