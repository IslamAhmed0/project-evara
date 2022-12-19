import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm/repository/Repository';
import { Project } from '../entities/project.entity';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
}
