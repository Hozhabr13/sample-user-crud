import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { paginate } from './pagination';

@Controller('user')
export class UserController {
  users: any[];

  constructor(private readonly userService: UserService) {
    this.users = [
      {
        firstName: 'Moha',
        lastName: 'Hozhi',
        role: 'member',
        email: 'moha.hozhi@gmail.com',
      },
    ];
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const emailIsExist = this.users.some(
      (user) => user.email === createUserDto.email,
    );

    if (!emailIsExist) {
      this.users = [...this.users, createUserDto];
    } else {
      throw new ForbiddenException(
        'کاربر دیگری با این ایمیل قبلا ثبت نام شده است',
      );
    }
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const paginatedData = paginate(this.users, +page, +limit);
    return paginatedData;
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.users.find((user) => user.email === email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    const currentUserIndex = this.users.findIndex(
      (user) => user.email === email,
    );
    this.users.splice(currentUserIndex, 1);

    this.users[currentUserIndex] = updateUserDto;

    return this.users[currentUserIndex];
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    const currentUserIndex = this.users.findIndex(
      (user) => user.email === email,
    );
    this.users.splice(currentUserIndex, 1);

    return 'User has been deleted!';
  }
}
