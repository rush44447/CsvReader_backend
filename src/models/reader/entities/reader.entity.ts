import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { State } from 'src/models/state/entities/state.entity/state/entities/state.entity';
import { PosterType } from 'src/models/poster-type/entities/poster-type.entity/poster-type/entities/poster-type.entity';
import { ChangeType } from 'src/models/change-type/entities/change-type.entity/change-type/entities/change-type.entity';
import { UserPoster } from './userposter.entity';

@Entity({ name: 'Poster' })
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsString()
  title: string;

  @Column({ length: 18, name: 'material' })
  @IsString()
  materialId: string;

  @Column()
  @IsString()
  description: string;

  @Column({ name: 'subcode' })
  @IsString()
  subCode: string;

  @Column()
  @IsString()
  language: string;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsBoolean()
  notify: boolean;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn({ name: 'state_id' })
  stateId: State;

  @Column({ name: 'poster_url', length: 255 })
  @IsString()
  posterUrl: string;

  @ManyToOne(() => PosterType, { eager: true })
  @JoinColumn({ name: 'posterType_id' })
  posterTypeId: PosterType;

  @ManyToOne(() => ChangeType, { eager: true })
  @JoinColumn({ name: 'changeType_id' })
  changeTypeId: ChangeType;

  @OneToMany(() => UserPoster, userPoster => userPoster.poster)
  userPosters: UserPoster[];

  @Column({ name: 'filename' })
  @IsString()
  fileName: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @Column({ name: 'created_by' })
  @IsNumber()
  createdBy: number;

  @Column({ name: 'updated_by' })
  @IsNumber()
  updatedBy: number;

  @Column()
  @IsString()
  alertDescription: string;

  setCreatedBy(poster: Poster, createdBy: number) {
    poster.createdBy = createdBy;
  }

  setUpdatedBy(poster: Poster, updatedBy: number) {
    poster.updatedBy = updatedBy;
  }
}
