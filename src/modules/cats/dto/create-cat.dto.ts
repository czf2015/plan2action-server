
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    @IsString({ message: '必须为字符串' })
    readonly name: string;

    @IsInt()
    readonly age: number;

    @IsString()
    readonly breed: string;
  }