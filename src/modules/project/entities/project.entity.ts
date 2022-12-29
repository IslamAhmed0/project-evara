import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Point } from 'geojson';
import { Location } from './location.entity';
import { InternalImageEntity } from './internal-image.entity';
import { ExternalImageEntity } from './external-image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({})
  @Column()
  sectorName: string;

  @ApiProperty({})
  @Column()
  initiatorName: string;

  @ApiProperty({})
  @Column()
  city?: string;


  @ApiProperty({})
  @Column()
  formImage?: string;


  @ApiProperty({})
  @Column()
  description?: string;

  @ApiProperty({ type: () => Location })
  @OneToOne(() => Location, { cascade: true, eager: true }) // specify inverse side as a second parameter
  @JoinColumn()
  location: Location;

  @ApiProperty({ type: () => InternalImageEntity, isArray: true })
  @OneToMany(() => InternalImageEntity, (cal) => cal.projectInternal, {
    cascade: true,
    eager: true,
  })
  internalImageEntity?: InternalImageEntity[];

  @ApiProperty({ type: () => ExternalImageEntity, isArray: true })
  @OneToMany(() => ExternalImageEntity, (cal) => cal.projectExternal, {
    cascade: true,
    eager: true,
  })
  externalImageEntity?: ExternalImageEntity[];
}
