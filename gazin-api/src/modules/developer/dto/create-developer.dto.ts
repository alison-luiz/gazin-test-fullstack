import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SexType } from "../enums/sex-type.enum";

export class CreateDeveloperDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(SexType)
  @IsNotEmpty()
  sexo: SexType;

  @IsString()
  @IsNotEmpty()
  datanascimento: Date;

  @IsString()
  @IsNotEmpty()
  hobby: string;

  @IsNumber()
  @IsNotEmpty()
  nivelId: number;
}
