import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'users', database: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'jsonb', nullable: true })
  address: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  additional_info: Record<string, any>;
}