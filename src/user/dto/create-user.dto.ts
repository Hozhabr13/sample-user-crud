import { IsEmail, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['admin', 'member'])
  role: string;
}
