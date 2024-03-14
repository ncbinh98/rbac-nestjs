import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { connectionSource } from 'src/config/typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const saltOrRounds = 10;
      if (!createUserDto?.role?.id) {
        const roleUser = await connectionSource.getRepository(Role).findOne({
          where: {
            name: 'User',
          },
        });
        createUserDto.role = { id: roleUser.id };
      }
      createUserDto.password = await hash(createUserDto.password, saltOrRounds);
      const user = await this.usersRepository.save(createUserDto);
      delete user.password;
      return user;
    } catch (error) {
      if (
        String(error.sqlMessage).includes('user.IDX_78a916df40e02a9deb1c4b75ed')
      ) {
        throw new BadRequestException({
          error: 'Bad Request',
          message: ['username.duplicate'],
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['role'],
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
