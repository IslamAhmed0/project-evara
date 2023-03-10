import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { InternalImageEntity } from './entities/internal-image.entity';
import { ExternalImageEntity } from './entities/external-image.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    @InjectRepository(InternalImageEntity)
    private readonly internalImageEntity: Repository<InternalImageEntity>,
    @InjectRepository(ExternalImageEntity)
    private readonly externalImageEntity: Repository<ExternalImageEntity>,
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
        .where('q.sectorName = :sectorName', { sectorName: sector })
        .getMany();
      if (!db) {
        throw new NotFoundException();
      }
      return db;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async filterCity(city: string) {
    try {
      const db = await this.repo
        .createQueryBuilder('q')
        .select(['COUNT(q.sectorName)', 'q.sectorName as sectorName'])
        .groupBy('q.sectorName')
        .where('q.city = :city', { city: city })
        .getRawMany();

      return db;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async filterSector(sector: string) {
    try {
      const db = await this.repo
        .createQueryBuilder('q')
        .select([
          'COUNT(q.id) as count',
          'q.sectorName as sector',
          'q.city as city',
        ])
        .groupBy('q.sectorName')
          .addGroupBy(' q.city')
        .where('q.sectorName = :sectorName', { sectorName: sector })
        .getRawMany();

      return db;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.repo.update(id, updateProjectDto);
  }

  async remove(id: number) {
    try {
      return await this.repo.delete(id);
      // await this.repo
      //   .createQueryBuilder()
      //   .delete()
      //   .from(Comment)
      //   .where('id = :id', { id: comment.id })
      //   .execute();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
