import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repository/project.repository';
import { LocationRepository } from './repository/location.repository';
import { InternalImageRepository } from './repository/internal-image.repository';
import { ExternalImageRepository } from './repository/external-image.repository';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}
  async create(createProjectDto: Project) {
    try {
      const save = await this.repo.save(createProjectDto);
      return save;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  findAll() {
    return this.repo.find({});
  }

  findOne(id: number) {
    return this.repo.find({
      where: { id: id },
    });
  }
  async filter(sector: string) {
    try {
      const db = await this.repo
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.location', 'location')
        .leftJoinAndSelect('q.internalImageEntity', 'internalImageEntity')
        .leftJoinAndSelect('q.externalImageEntity', 'externalImageEntity')
        .where('q.sectorName = :sectorName', { sectorName:sector })
        .getMany();
      if (!db) {
        throw new NotFoundException()
      }
      return db;
    }catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
