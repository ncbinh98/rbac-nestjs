import { Controller, Get, Param, Delete } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stories')
@Controller('stories')
export class StoriesController {
	constructor(private readonly storiesService: StoriesService) {}

	@Get()
	findAll() {
		return this.storiesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.storiesService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.storiesService.remove(+id);
	}
}
