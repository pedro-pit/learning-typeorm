import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(photoData: CreatePhotoDto): Promise<Photo> {
    const photo = this.photoRepository.create(photoData);
    return this.photoRepository.save(photo);
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async findOne(id: number): Promise<Photo | null> {
    return this.photoRepository.findOneBy({ id });
  }

async update(id: number, data: Partial<Photo>): Promise<Photo> {
  const entity = await this.photoRepository.preload({
    id,
    ...data,
  });

  if (!entity) {
    throw new HttpException('Foto não encontrada', HttpStatus.NOT_FOUND); 
  }

  return this.photoRepository.save(entity);
}


  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
