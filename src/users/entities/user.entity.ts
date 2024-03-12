import { IsString, Matches, MinLength } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { Story } from 'src/stories/entities/story.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @Column({ nullable: true })
  age?: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Story, (st) => st.createdUser)
  stories: Story[];
}
