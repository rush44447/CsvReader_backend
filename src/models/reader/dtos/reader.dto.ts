import { IsString, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class PosterDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  materialId: string;

  @IsString()
  description: string;

  @IsString()
  subCode: string;

  @IsString()
  language: string;

  @IsDate()
  date: Date;

  @IsBoolean()
  notify: boolean;

  // ... (add similar validations for other properties)

  @IsString()
  fileName: string;

  @IsDate()
  createdDate: Date;

  @IsDate()
  updatedDate: Date;

  @IsNumber()
  createdBy: number;

  @IsNumber()
  updatedBy: number;

  @IsString()
  alertDescription: string;
}
