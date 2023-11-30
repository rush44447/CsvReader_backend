import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fastcsv from 'fast-csv';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    async convertCsvToJson(@UploadedFile() file): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const records = [];
      
            const bufferString = file.buffer.toString('utf-8');
            const bufferStream = fastcsv.parseString(bufferString, { headers: true });
      
            bufferStream
              .on('data', (data) => {
                records.push(data);
              })
              .on('end', () => {
                resolve(records);
              })
              .on('error', (error) => {
                reject(error);
              });
          });
        }

        async insertData(records){
          const users = records.map((record) => {
            return {
              name: record.name,
              age: record.age,
              address: record.address,
              additional_info: record.additional_info,
            };
          });
      
          // Insert users into the database
          await this.userRepository.save(users);
      
          return records;
        }
    }
