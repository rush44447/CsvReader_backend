
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('processCsv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<any[]> {
    const jsonData = await this.userService.convertCsvToJson(file);
    // Process jsonData and return or store it in the database
    return jsonData;
  }
}