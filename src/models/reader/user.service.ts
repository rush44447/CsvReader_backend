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
  ) { }

  getUser() {
    return this.userRepository.find()
  }
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

  async insertData(records) {
    const users = records.map((record) => {
      return {
        name: record.name.firstName + " " + record.name.lastName,
        age: record.age,
        address: record.address.line1 + "," + record.address.line2 + "," + record.address.city + "," + record.address.state,
        additional_info: { gender: record.gender },
      };
    });

    // Insert users into the database
    await this.userRepository.save(users);

    return [{
      "Age-Group": '<20',
      "%Distribution": await this.getDistribution("lessThan20")
    }, {
      "Age-Group": '20 to 40',
      "%Distribution": await this.getDistribution("20to40")
    }, {
      "Age-Group": '40 to 60',
      "%Distribution": await this.getDistribution("40to60")
    }, {
      "Age-Group": '>60',
      "%Distribution": await this.getDistribution("moreThan60")
    }
    ];
  }

  getDistribution(ageRange: string) {
    let queryBuilder = this.userRepository.createQueryBuilder('user');

    // Filter users based on age range
    if (ageRange === 'lessThan20') {
      queryBuilder = queryBuilder.where('user.age < 20');
    } else if (ageRange === '20to40') {
      queryBuilder = queryBuilder.where('user.age >= 20 AND user.age <= 40');
    } else if (ageRange === '40to60') {
      queryBuilder = queryBuilder.where('user.age >= 40 AND user.age <= 60');
    } else if (ageRange === 'moreThan60') {
      queryBuilder = queryBuilder.where('user.age > 60');
    } else {
      throw new Error('Invalid age range specified');
    }
    return queryBuilder.getCount();
  }


  unflatten(jsonArray: any) {

    const result: any[] = [];

    for (const flatObject of jsonArray) {
      const unflattenedObject: any = {};
      for (const key in flatObject) {
        const keys = key.split('.');
        let currentLevel = unflattenedObject;
        for (let i = 0; i < keys.length; i++) {
          const currentKey = keys[i];
          const isLastKey = i === keys.length - 1;
          if (isLastKey) {
            currentLevel[currentKey] = flatObject[key];
          } else {
            currentLevel[currentKey] = currentLevel[currentKey] || {};
            currentLevel = currentLevel[currentKey];
          }
        }
      }
      result.push(unflattenedObject);
    }
    return result;
  }

}
