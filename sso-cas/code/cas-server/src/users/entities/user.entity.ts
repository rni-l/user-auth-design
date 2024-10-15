import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  // @PrimaryGeneratedColumn({ type: 'int8' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 32 })
  pwd: string;

  @CreateDateColumn()
  createdAt: string;
}
