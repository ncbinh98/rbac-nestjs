import { FindAllResponse } from 'src/types/common.type';
import { BaseRepositoryInterface } from './base.interface.repository';
import { Repository } from 'typeorm';
import { BaseEntity } from 'src/modules/shared/base/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
	implements BaseRepositoryInterface<T>
{
	protected constructor(private readonly repo: Repository<T>) {
		this.repo = repo;
	}

	async create(dto: T | any): Promise<T> {
		return await this.repo.save(dto);
	}

	async findOneById(id: any, relations?: string[]): Promise<T> {
		const item = await this.repo.findOne({
			where: { id },
			relations,
		});

		return item.deletedAt ? null : item;
	}

	async findOneByCondition(
		condition?: object,
		relations?: string[],
	): Promise<T> {
		const item = await this.repo.findOne({
			where: { ...condition, deletedAt: null },
			relations,
		});
		return item;
	}

	async findAll(
		condition: object,
		options?: object,
	): Promise<FindAllResponse<T>> {
		const [list, count] = await this.repo.findAndCount({
			where: { ...condition, deletedAt: null },
			...options,
		});
		return {
			count,
			items: list,
		};
	}

	async update(id: any, dto: QueryDeepPartialEntity<T>): Promise<T> {
		const item = (await this.repo.update({ id }, { ...dto })).raw[0];
		return item;
	}

	async softDelete(id: any): Promise<boolean> {
		const deleteItem = await this.repo.findOne({ where: { id } });
		if (!deleteItem) return false;
		const dto: any = { deletedAt: new Date() };

		return !!(await this.repo.update({ id }, { ...dto }));
	}

	async permanentlyDelete(id: any): Promise<boolean> {
		const deleteItem = await this.repo.findOne({ where: { id } });
		if (!deleteItem) return false;
		return !!(await this.repo.delete({ id }));
	}
}
