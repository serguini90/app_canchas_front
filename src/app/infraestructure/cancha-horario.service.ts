import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CanchaHorarioGateway } from '../domain/models/gateway/cancha-horario.gateway';
import { CanchaHorarioDto } from '../domain/models/cancha-horario';

@Injectable({
    providedIn: 'root'
})
export class CanchaHorarioService extends CanchaHorarioGateway {

    private _url = environment.serviceUrl + '/cancha-horario';

    constructor(private http: HttpClient) {
        super();
    }

    override crear(body: CanchaHorarioDto): Observable<CanchaHorarioDto> {
        return this.http.post<CanchaHorarioDto>(this._url, body);
    }
    override actualizar(body: CanchaHorarioDto): Observable<CanchaHorarioDto> {
        return this.http.put<CanchaHorarioDto>(this._url, body);
    }

    override getHorariosByCancha(idCancha: string): Observable<CanchaHorarioDto[]> {
        return this.http.get<CanchaHorarioDto[]>(this._url+'/cancha/'+idCancha);
    }

    override getHorariosByCanchaLibre(idCancha: string, objeto: any): Observable<CanchaHorarioDto[]> {
        return this.http.post<CanchaHorarioDto[]>(this._url+'/cancha/'+idCancha + '/libre', objeto);
    }

}
