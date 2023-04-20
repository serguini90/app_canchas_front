import { Observable } from 'rxjs';
import { LoginDto, RegisterDto, ResponseLoginDto, ResponseRegisterDto, ResponseValidateDto, ValidatePhoneEmailDto, ValidateUsernameDto } from '../auth';

export abstract class AuthGateway {
  abstract registerUser(body: RegisterDto): Observable<ResponseRegisterDto>;
  abstract loginUser(body: LoginDto): Observable<ResponseLoginDto>;
  abstract validateUser(body: ValidateUsernameDto): Observable<ResponseValidateDto>;
  abstract validatePhoneEmail(body: ValidatePhoneEmailDto): Observable<ResponseValidateDto>;

}
