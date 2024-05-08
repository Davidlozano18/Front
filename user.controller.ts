import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('crear')
  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return false;
    }
    return true;
  }

  @MessagePattern('obtener')
  async findOne(id: number): Promise<User | string> {
    const user = await this.userService.findOne(id);
    if (!user) {
      console.log('no se encontro registros');
      return 'error';
    }
    return user;
  }

  @MessagePattern('actualizar')
  async update(updateUserDto: UpdateUserDto): Promise<boolean> {
    const user = await this.userService.update(updateUserDto);
    if (!user) {
      return false;
    }
    return true;
  }

  @MessagePattern('usuarios')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @MessagePattern('eliminar')
  async remove(id: number): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return false;
    }
    this.userService.remove(id);
    return true;
  }
}