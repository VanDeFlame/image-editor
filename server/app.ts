import cors from 'cors';
import express from 'express';
import { environment } from './config/environment';
import { routes } from './routes';

const PORT = environment.port;
const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/v1', routes);
server.use(express.static('public'));

server.listen(PORT, () => {
	console.info(`Servidor Express corriendo en puerto ${PORT}`);
});
