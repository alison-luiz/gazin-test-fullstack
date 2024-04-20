import { IsEnum, IsNumber, IsString } from "class-validator";
import { SexType } from "../enums/sex-type.enum";

export class CreateDeveloperDto {
  @IsString()
  nome: string;

  @IsEnum(SexType)
  sexo: SexType;

  @IsString()
  datanascimento: Date;

  @IsString()
  hobby: string;

  @IsNumber()
  nivelId: number;
}
