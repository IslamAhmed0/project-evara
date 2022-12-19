import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from './project.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({})
  @Column()
  lat: string;

  @ApiProperty({})
  @Column()
  lng: string;

  @ApiProperty({})
  @Column()
  city?: string;

  @OneToOne(() => Project,) // specify inverse side as a second parameter
  project: Project;
}
