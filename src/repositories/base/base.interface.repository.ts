import { FindAllResponse } from 'src/types/common.type';

export interface BaseRepositoryInterface<T> {
	create(dto: T | any): Promise<T>;

	findOneById(id: string, relations?: string[]): Promise<T>;

	findOneByCondition(condition?: object, relations?: string[]): Promise<T>;

	findAll(condition: object, options?: object): Promise<FindAllResponse<T>>;

	update(id: string, dto: any): Promise<T>;

	softDelete(id: string): Promise<boolean>;

	permanentlyDelete(id: string): Promise<boolean>;
}
