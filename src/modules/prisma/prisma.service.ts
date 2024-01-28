import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	/**
	 * @description - Connects to the database when the module initializes
	 */
	async onModuleInit() {
		await this.$connect();
	}
}
