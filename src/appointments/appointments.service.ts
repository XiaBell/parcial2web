import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointments.entity';
import { User } from '../users/user.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepo: Repository<Appointment>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async createAppointment(dto: CreateAppointmentDto) {
    const user = await this.usersRepo.findOne({ where: { id: dto.id_user } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const appointment = this.appointmentsRepo.create({
      datetime: dto.datetime,
      status: dto.status,
      user: user,
    });
    return this.appointmentsRepo.save(appointment);
  }

  async getAppointments(userId: string) {
    return this.appointmentsRepo.find({
      where: { user: { id: userId } },
    });
  }

  async updateAppointment(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.appointmentsRepo.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    appointment.status = dto.status;
    return this.appointmentsRepo.save(appointment);
  }

  async deleteAppointment(id: string, userId: string) {
    const appointment = await this.appointmentsRepo.findOne({ where: { id } });
    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    if (appointment.user.id !== userId) {
      throw new ForbiddenException('No puedes eliminar esta cita');
    }

    await this.appointmentsRepo.delete(id);
    return { message: 'Cita eliminada' };
  }
}
