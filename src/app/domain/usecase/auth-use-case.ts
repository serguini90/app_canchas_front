import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGateway } from '../models/auth/gateway/auth.gateway';
import { LoginDto, RegisterDto, ResponseLoginDto, ResponseRegisterDto, ResponseValidateDto, ValidatePhoneEmailDto, ValidateUsernameDto } from '../models/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCases {
  constructor(private _authGateway: AuthGateway) {}

  registerUser(body: RegisterDto): Observable<ResponseRegisterDto> {
    return this._authGateway.registerUser(body);
  }

  loginUser(body: LoginDto): Observable<ResponseLoginDto>{
    return this._authGateway.loginUser(body);
  }

  validateUser(body:ValidateUsernameDto): Observable<ResponseValidateDto>{
    return this._authGateway.validateUser(body);
  }

  validatePhoneEmail(body:ValidatePhoneEmailDto): Observable<ResponseValidateDto>{
    return this._authGateway.validatePhoneEmail(body);
  }

}