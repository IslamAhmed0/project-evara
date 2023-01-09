import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Project } from './project.entity';

@Entity()
export class InternalImageEntity {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty({})
  @Column()
  path: string;

  @ManyToOne(() => Project, (project) => project, {
    //cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  projectInternal: Project;
}
