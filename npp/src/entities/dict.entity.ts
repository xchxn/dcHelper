import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column()
  description: string;

}
