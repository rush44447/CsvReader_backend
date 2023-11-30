
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReaderService } from './reader.service';

@Controller('readers')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Post('processCsv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<any[]> {
    const jsonData = await this.readerService.convertCsvToJson(file);
    // Process jsonData and return or store it in the database
    return jsonData;
  }
}