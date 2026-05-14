import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from '../roles/role.entity';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
  ) {}

  async findAll() {
    try {
      const users = await this.usersRepo.find();
      return users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        roles: u.roles.map((r) => r.role_name),
      }));
    } catch (e) {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }

  async findById(id: string) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles.map((r) => r.role_name),
    };
  }

  async assignRoles(id: string, roleNames: string[]) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const roles = await this.rolesRepo.find({
      where: { role_name: In(roleNames) },
    });

    if (roles.length !== roleNames.length) {
      throw new BadRequestException('roles inválidos');
    }

    user.roles = roles;
    await this.usersRepo.save(user);
    return { message: 'Roles asignados' };
  }
}
