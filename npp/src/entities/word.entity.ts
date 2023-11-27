import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column()
  describe: string;

  @Column()
  tendency: string;

  @Column()
  gallery: string;
}
