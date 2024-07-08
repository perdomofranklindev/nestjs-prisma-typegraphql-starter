import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Prisma } from '@prisma/client';
import { Cat } from 'prisma/generated/type-graphql';

@Controller('cats')
export class CatsController {
	/**
	 * Inject the CatsService for handling cat data access.
	 */
	constructor(private readonly catsService: CatsService) {}

	/**
	 * @description - Get a list of all cats.
	 * @param {Prisma.CatFindManyArgs} query - An object containing Prisma query arguments for filtering and pagination.
	 * @returns {Promise<Cat[]>} - An array of `Cat` objects.
	 */
	@Get()
	async findAll(@Query() query?: Prisma.CatFindManyArgs) {
		return this.catsService.cats(query);
	}

	/**
	 * @description - Get a specific cat by its ID.
	 * @param {string} id - The ID of the cat to retrieve.
	 * @returns {Promise<Cat>} -  A `Cat` object or throws an error if the cat is not found.
	 */
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Cat> {
		const parsedId = Number(id);
		if (isNaN(parsedId)) {
			throw new BadRequestException('Invalid cat ID'); // Handle invalid IDs with an appropriate error response
		}

		return this.catsService.cat({
			where: { id: parsedId },
		});
	}
}
