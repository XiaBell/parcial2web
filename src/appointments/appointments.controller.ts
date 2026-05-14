import { Controller, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('createappointment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Get('appointments/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  getAppointments(@Req() req) {
    return this.appointmentsService.getAppointments(req.user.userId);
  }

  @Patch('appointments/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  updateAppointment(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.updateAppointment(id, dto);
  }
  
  @Delete('appointments/:id/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('patient')
  deleteAppointment(@Param('id') id: string, @Req() req) {
    return this.appointmentsService.deleteAppointment(id, req.user.userId);
  }


}