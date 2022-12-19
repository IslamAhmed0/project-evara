import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { InternalImageEntity } from '../entities/internal-image.entity';

@CustomRepository(InternalImageEntity)
export class InternalImageRepository extends Repository<InternalImageEntity> {}
