import { Injectable, UploadedFile } from '@nestjs/common';
import * as fastcsv from 'fast-csv';

@Injectable()
export class ReaderService {
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
    }
