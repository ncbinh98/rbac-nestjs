import { Injectable } from '@nestjs/common';

@Injectable()
export class StoriesService {
	create() {
		return 'This action adds a new story';
	}

	findAll() {
		return `This action returns all stories`;
	}

	findOne(id: number) {
		return `This action returns a #${id} story`;
	}

	update(id: number) {
		return `This action updates a #${id} story`;
	}

	remove(id: number) {
		return `This action removes a #${id} story`;
	}
}
