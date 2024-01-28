import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { PrismaService } from '../prisma/prisma.service';

// Mock the entire Prisma module
jest.mock('@prisma/client', () => {
	return {
		PrismaClient: jest.fn().mockImplementation(() => {
			return {
				cat: {
					findUnique: jest.fn(),
					findMany: jest.fn(),
				},
			};
		}),
	};
});

describe('CatsService', () => {
	let service: CatsService;
	let prisma;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CatsService, PrismaService],
		}).compile();

		service = module.get<CatsService>(CatsService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return null for a non-existent cat', async () => {
		prisma.cat.findUnique.mockResolvedValueOnce(null);
		const response = await service.cat({ where: { id: 999 } });
		expect(response).toBeNull();
	});

	it('should return a paginated list of cats', async () => {
		const catsArray = [
			{ id: 1, name: 'Whiskers' },
			{ id: 2, name: 'Fluffy' },
		];

		prisma.cat.findMany.mockImplementation(({ skip, take }) => {
			return Promise.resolve(catsArray.slice(skip, skip + take));
		});

		const response = await service.cats({ skip: 1, take: 1 });
		expect(response).toEqual([{ id: 2, name: 'Fluffy' }]);
	});
});
