export interface ReservaDto {
    idReserva: string;
    idUsuario: string;
    fecha: Date;
    idCanchaHorario: string;
    idMedioPago: string;
    indicadorHabilitado: boolean;
    metodoPago: string;
    direccion: string;
    horaInicio: string;
    horaFin: string;
}