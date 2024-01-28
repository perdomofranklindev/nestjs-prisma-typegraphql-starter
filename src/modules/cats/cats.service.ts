import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Cat } from 'prisma/generated/type-graphql';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CatsService {
	constructor(private prisma: PrismaService) {}

	/**
	 * @description - Get a cat
	 * @param {Prisma.CatFindUniqueArgs} args - Find unique cat args.
	 * @returns {Promise<Cat | null>} - A cat or null.
	 */
	async cat(args: Prisma.CatFindUniqueArgs): Promise<Cat | null> {
		return this.prisma.cat.findUnique(args);
	}

	/**
	 * @description - Get cats.
	 * @param {Prisma.CatFindManyArgs} args - Find many cats args.
	 * @returns {Promise<Cat[]>} - An array of cats.
	 */
	async cats(args?: Prisma.CatFindManyArgs): Promise<Cat[]> {
		const { skip, take, cursor, where, orderBy } = args;
		return this.prisma.cat.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}
}
