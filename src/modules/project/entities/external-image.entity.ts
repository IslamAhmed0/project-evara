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
export class ExternalImageEntity {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty({})
  @Column()
  path: string;
  @ManyToOne(() => Project, (project) => project, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  projectExternal: Project;
}
