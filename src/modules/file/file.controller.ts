import { Controller, Get, Param, Post, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import { FileService } from './file.service';
import { diskStorage } from 'multer';


@ApiTags('File')
@Controller('File')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async uploadedFile(@Req()req, @UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const link = `${req.protocol}://${req.get('Host')}/file/${file.filename}`
    return {
      status:true,
      message:"success",
      data:{
        link:link
      }
    };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20),
  )
  async uploadMultipleFiles(@Req() req,@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = [];

    files.forEach(file => {
      response.push(`${req.protocol}://${req.get('Host')}/file/${file.filename}`);
    });
    return {
      status:true,
      message:"success",
      data:{
        links:response
      }
    };
  }


  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '../uploads' });
  }

}