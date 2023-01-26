import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: Project) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Get('filter/:sector')
  filter(@Param('sector') sector: string) {
    console.log(sector);
    return this.projectService.filter(sector);
  }
  @Get('countByCity/:city')
  filterCity(@Param('city') sector: string) {
    console.log(sector);
    return this.projectService.filterCity(sector);
  }

  @Get('countBySector/:sector')
  filterSector(@Param('sector') sector: string) {
    console.log(sector);
    return this.projectService.filterSector(sector);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
