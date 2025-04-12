import { z } from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	DATABASE_PORT: z.coerce.number().default(5432),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_NAME: z.string(),
	PORT_NEST_LOCALHOST: z.coerce.number().optional().default(3000),
	BASE_APP_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
