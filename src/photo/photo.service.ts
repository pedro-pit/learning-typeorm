
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async create(photoData: CreatePhotoDto): Promise<Photo> {
    return this.photoRepository.create(photoData);
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
