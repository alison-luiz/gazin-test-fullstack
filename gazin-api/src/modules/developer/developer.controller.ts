import { QueryTemplateDto } from '@/shared/dtos/query-template.dto';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { CreateDeveloperService } from './services/create-developer.service';
import { DeleteDeveloperService } from './services/delete-developer.service';
import { FindDeveloperService } from './services/find-developer.service';
import { UpdateDeveloperService } from './services/update-developer.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('desenvolvedores')
export class DeveloperController {
  constructor(
    private readonly createDeveloperService: CreateDeveloperService,
    private readonly updateDeveloperService: UpdateDeveloperService,
    private readonly findDeveloperService: FindDeveloperService,
    private readonly deleteDeveloperService: DeleteDeveloperService,
  ) {}

  @Get()
  findAll(@Query() query: QueryTemplateDto) {
    return this.findDeveloperService.findAll(query)
  }

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.createDeveloperService.excute(createDeveloperDto)
  }

  @Put(':id')
  update(@Body() updateDeveloperDto: UpdateDeveloperDto, @Param('id') id: string) {
    return this.updateDeveloperService.excute(+id, updateDeveloperDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteDeveloperService.execute(+id)
  }
}
