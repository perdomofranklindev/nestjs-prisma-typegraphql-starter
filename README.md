# Nestjs, Prisma and Typegraphql starter

## How to run the apps
### TypeGraphql Module & Nestjs
```typescript
// ./src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

const prisma = new PrismaClient();

@Module({
	imports: [
		// You can call here the rest of the nestjs modules...
		TypeGraphQLModule.forRoot({
			driver: ApolloDriver,
			emitSchemaFile: true,
			validate: false,
			path: '/graphql',
			context: ({ req }) => ({
				...req,
				prisma,
			}),
		}),
	],
})
export class AppModule {}
```

```bash
./src/main.ts
```

```typescript
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	await app.listen(3000);
}
bootstrap();

```

### Run Apollo API Explorer
Please note that this setup assumes that you're using Apollo Server standalone. If you want to integrate Apollo Server with your NestJS application, you might need to use a different approach.

```typescript
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';

const prisma = new PrismaClient();

async function bootstrap() {
	const schema = await buildSchema({
		validate: false,
		resolvers: [ /* TypeGraphql resolvers here... */ ],
		globalMiddlewares: [ /* Global Middlewares... */ ],
	});

	// Declare some variables .env for this setup.
	const server = new ApolloServer({
		introspection: true,
		debug: true,
		csrfPrevention: true,
		cors: true,
		cache: 'bounded',
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
}
```

### You can run both

```typescript
// Import the libs...

async function bootstrap() {

	// Apollo API Explorer server...

	const schema = await buildSchema({
		// Rest of the options...
	});

	const server = new ApolloServer({
		// Rest of the options...
		schema,
	});

	server
		.listen(4000)
		.then(({ url }) => {
			console.log(`Server ready at ${url}`);
		})
		.catch(err => {
			console.log(`Error: ${err}`);
		});
	
	// Nestjs server...

	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);
	await app.listen(3000);
}
bootstrap();

```