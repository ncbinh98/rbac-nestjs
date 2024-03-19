import { BaseEntity } from 'src/modules/shared/base/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Story extends BaseEntity {
	@Column({ nullable: true })
	name?: string;

	@ManyToOne(() => User, (user) => user.stories)
	createdUser: User;
}
