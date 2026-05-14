import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  id_user: string;

  @IsString()
  @IsNotEmpty()
  datetime: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
