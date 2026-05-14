import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    const existing = await this.rolesRepo.findOne({
      where: { role_name: dto.role_name },
    });
    if (existing) {
      throw new ConflictException('role_name ya existe');
    }

    const role = this.rolesRepo.create({
      role_name: dto.role_name,
      description: dto.description,
    });
    const saved = await this.rolesRepo.save(role);

    return { message: 'Rol creado con éxito', roleId: saved.id };
  }

  async findAll() {
    try {
      const roles = await this.rolesRepo.find();
      return roles.map((r) => ({
        id: r.id,
        role_name: r.role_name,
        description: r.description,
      }));
    } catch (e) {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }
}
