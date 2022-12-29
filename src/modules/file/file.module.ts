import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';

export const imageFileFilter = (req, file: Express.Multer.File, callback) => {
  return file.mimetype === 'image/gif' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
    ? callback(null, true)
    : callback(new Error('Only image files are allowed!'), false);
};
export const editFileName = (req, file: Express.Multer.File, callback) => {
  console.log('recieved request ', req);
  console.log(file);

  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  console.log(randomName);

  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
