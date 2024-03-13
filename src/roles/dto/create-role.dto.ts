import { IsBoolean, IsJSON, IsString } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  name: string;
}
