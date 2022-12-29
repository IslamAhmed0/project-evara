import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmExModule } from '../../database/typeorm-ex.module';
import { ProjectRepository } from './repository/project.repository';
import { LocationRepository } from './repository/location.repository';
import { InternalImageEntity } from './entities/internal-image.entity';
import { ExternalImageEntity } from './entities/external-image.entity';
import { InternalImageRepository } from './repository/internal-image.repository';
import { ExternalImageRepository } from './repository/external-image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Location } from './entities/location.entity';

@Module({
  // imports: [
  //   TypeOrmExModule.([
  //     ProjectRepository,
  //     LocationRepository,
  //     InternalImageRepository,
  //     ExternalImageRepository,
  //   ]),
  // ],
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Location,
      ExternalImageEntity,
      InternalImageEntity,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
