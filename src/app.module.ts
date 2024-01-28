import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
	imports: [
		CatsModule,
		PrismaModule
	],
})
export class AppModule {}
