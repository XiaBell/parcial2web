import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
