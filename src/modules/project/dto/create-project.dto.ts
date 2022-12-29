import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';
import { Location } from '../entities/location.entity';
import { InternalImageEntity } from '../entities/internal-image.entity';
import { ExternalImageEntity } from '../entities/external-image.entity';

export class LocationDto {
  @ApiProperty({})
  @Column()
  lat: string;

  @ApiProperty({})
  @Column()
  lng: string;
}

export class CreateProjectDto {
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

  @ApiProperty({})
  @Column()
  Location: LocationDto;

  @ApiProperty({ type: () => InternalImageEntity, isArray: true })
  internalImage: InternalImageEntity[];

  @ApiProperty({ type: () => ExternalImageEntity, isArray: true })
  @Column()
  externalImage: ExternalImageEntity[];
}
