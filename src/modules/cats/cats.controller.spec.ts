import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PrismaService } from '../prisma/prisma.service';
import { Cat } from '@prisma/client';

describe('CatsController', () => {
	let controller: CatsController;
	let service: CatsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CatsService, PrismaService],
			controllers: [CatsController],
		}).compile();

		controller = module.get<CatsController>(CatsController);
		service = module.get<CatsService>(CatsService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return an array of cats', async () => {
		const result = [
			{ id: 1, name: 'Gatsby' },
			{ id: 2, name: 'Luigi' },
		] as Cat[];

		jest.spyOn(service, 'cats').mockImplementation(async () => result);

		expect(await controller.findAll()).toStrictEqual(result);
	});
});
