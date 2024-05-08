import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newuser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newuser);
    //return 'crear';
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User | null> {
    const userData = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
    };
    const id = updateUserDto.id;
    await this.userRepository.update(id, userData);
    const user = this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}