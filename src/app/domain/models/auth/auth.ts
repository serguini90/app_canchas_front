/*Entity*/

export interface UserEntity{
    idUsuario: string,
    usuario: string,
    password: string,
    celular: string,
    correo: string,
    indicadorProveedor: boolean,
    indicadorHabilitado: boolean
}

/*Request DTO*/

export interface RegisterDto {
    usuario: string,
    password: string,
    celular: string,
    correo: string,
    indicadorProveedor: boolean,
    indicadorHabilitado:boolean
}

export interface LoginDto {
    usuario: string,
    password: string,
}

export interface ValidatePhoneEmailDto{
    correo:string,
    celular:string
}

export interface ValidateUsernameDto{
    usuario:string
}

/*Response DTO*/

export interface ResponseLoginDto{
    estado: boolean,
    respuesta: string
}

export interface ResponseRegisterDto {
    idUsuario: string,
    usuario: string,
    celular: string,
    correo: string,
    indicadorProveedor: number,
    indicadorHabilitado: number
}

export interface ResponseValidateDto {
    estado: boolean
}