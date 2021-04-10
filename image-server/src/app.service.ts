import { HttpService, Injectable } from '@nestjs/common';

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'luixaviles',
  api_key: process.env.CLOUDINARY_API_KEY || '392635498516357',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || '0ksCM92kfVsWkO8ajNBpThtdu58',
});

import toStream = require('buffer-to-stream');
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        console.log('result', result);
        resolve(result);
      });

      toStream(file.buffer).pipe(uploadStream);
    });
  }
}
