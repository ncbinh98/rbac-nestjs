import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  inverted: boolean;

  @Column({ type: 'simple-json', nullable: true })
  conditions: {};

  @Column({ type: 'simple-array', nullable: true })
  fields: string[];

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
