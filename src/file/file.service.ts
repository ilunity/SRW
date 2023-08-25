import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

export enum FileType {
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: Express.Multer.File): string {
    try {
      if (!file) {
        return '';
      }

      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createImageFromBase64(base64String?: string): string {
    if (!base64String) {
      return undefined;
    }

    try {
      const [extension, base64Image] = base64String.split(';base64,');

      const fileExtension = extension.split('/').pop().split('+')[0];
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', FileType.IMAGE);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), base64Image, { encoding: 'base64' });
      return FileType.IMAGE + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @returns {String} Returns the new filePath. */
  changeImageFromBase64(filePath: string, base64String?: string): string {
    const newImagePath = this.createImageFromBase64(base64String);
    this.removeFile(filePath);

    return newImagePath;
  }

  removeFile(filePath: string) {
    try {
      if (!fs.existsSync(filePath)) {
        return;
      }

      fs.rmSync(filePath);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
