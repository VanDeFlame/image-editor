import { config } from 'dotenv';

config();
export const environment = {
	port: process.env.PORT || 8080,
};
