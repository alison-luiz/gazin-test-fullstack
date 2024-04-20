import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryTemplateDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}