import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { Location } from '../entities/location.entity';
import { ExternalImageEntity } from '../entities/external-image.entity';

@CustomRepository(ExternalImageEntity)
export class ExternalImageRepository extends Repository<ExternalImageEntity> {}
