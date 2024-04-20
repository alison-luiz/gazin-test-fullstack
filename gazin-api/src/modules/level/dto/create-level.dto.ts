import { IsString } from "class-validator";

export class CreateLevelDto {
  @IsString()
  nivel: string;
}
