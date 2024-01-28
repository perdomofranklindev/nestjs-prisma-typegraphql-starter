import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PrismaModule } from '../prisma/prisma.module';
import {
	FindFirstCatResolver,
	FindManyCatResolver,
	FindUniqueCatResolver,
} from 'prisma/generated/type-graphql';

@Module({
	controllers: [CatsController],
	providers: [
		CatsService,
		FindUniqueCatResolver,
		FindManyCatResolver,
		FindFirstCatResolver,
	],
	imports: [PrismaModule],
})
export class CatsModule {}
