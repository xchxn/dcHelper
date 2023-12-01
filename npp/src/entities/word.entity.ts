import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  word: string;

  @Column()
  describe: string;

  @Column()
  count: number;
  
  @Column()
  trendPoint: number;
}
