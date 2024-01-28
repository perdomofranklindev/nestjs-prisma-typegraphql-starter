import { FindManyCatResolver } from 'prisma/generated/type-graphql';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

const prisma = new PrismaClient();

async function bootstrap() {
	const schema = await buildSchema({
		validate: false,
		resolvers: [FindManyCatResolver],
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }) => ({
			...req,
			prisma,
		}),
	});

	server
		.listen(4000)
		.then(({ url }) => {
			console.log(`Server ready at ${url}`);
		})
		.catch(err => {
			console.log(`Error: ${err}`);
		});

	// Nestjs

	const app = await NestFactory.create(AppModule);

	await app.listen(3000);
}
bootstrap();
