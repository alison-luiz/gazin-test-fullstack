import { QueryTemplateDto } from '@/shared/dtos/query-template.dto';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { CreateLevelService } from './services/create-level.service';
import { DeleteLevelService } from './services/delete-level.service';
import { FindLevelService } from './services/find-level.service';
import { UpdateLevelService } from './services/update-level.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('niveis')
export class LevelController {
  constructor(
    private readonly createLevelService: CreateLevelService,
    private readonly updateLevelService: UpdateLevelService,
    private readonly findLevelService: FindLevelService,
    private readonly deleteLevelService: DeleteLevelService,
  ) {}

  @Get()
  findAll(@Query() query: QueryTemplateDto) {
    return this.findLevelService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findLevelService.findOne(+id);
  }

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.createLevelService.execute(createLevelDto);
  }

  @Put(':id')
  update(
    @Body() updateLevelDto: UpdateLevelDto,
    @Param('id') id: string
  ) {
    return this.updateLevelService.execute(+id, updateLevelDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteLevelService.execute(+id);
  }
}
