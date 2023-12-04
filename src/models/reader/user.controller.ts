
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AppLogger } from 'src/utils/app.logger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private logger: AppLogger) {}

  @Get()
  getA(){
    return this.userService.getUser();
  }
  @Post()
  async uploadFile(@UploadedFile() file) {
    const jsonData = await this.userService.convertCsvToJson(file);
    const nestedObject = this.userService.unflatten(jsonData);
    this.logger.log(`Found : ${JSON.stringify(nestedObject)}`)
    console.log(nestedObject)
    return this.userService.insertData(nestedObject);
  }

}