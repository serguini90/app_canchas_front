import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto, ResponseLoginDto, ResponseRegisterDto, ResponseValidateDto, ValidatePhoneEmailDto, ValidateUsernameDto } from 'src/app/domain/models/auth/auth';
import { AuthGateway } from 'src/app/domain/models/auth/gateway/auth.gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthGateway{

  private _url = environment.serviceUrl;

  constructor(private http:HttpClient) { 
    super();
  }

  override registerUser(body: RegisterDto): Observable<ResponseRegisterDto> {
    return this.http.post<ResponseRegisterDto>(this._url + '/usuario', body);
  }

  override loginUser(body: LoginDto): Observable<ResponseLoginDto> {
    return this.http.post<ResponseLoginDto>(this._url + '/usuario/login', body);
  }

  override validateUser(body: ValidateUsernameDto): Observable<ResponseValidateDto> {
    return this.http.post<ResponseValidateDto>(this._url + '/usuario/validarUsuario', body);
  }

  override validatePhoneEmail(body: ValidatePhoneEmailDto): Observable<ResponseValidateDto> {
    return this.http.post<ResponseValidateDto>(this._url + '/usuario/validarDatosTelefonoCorreo', body);
  }
}
