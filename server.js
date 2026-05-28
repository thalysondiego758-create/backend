import { fastify } from 'fastify';
import 'dotenv/config';
const {PORT} = process.env;

console.log('Variaveis de ambiente carregadas:', { PORT});

const server = fastify();

server.get('/', async (request, reply) => {
    return {message: 'API server - Barbearia'};
});

server.listen({port:PORT}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
  console.log('Servirdor rodando em ${address}');  }
});
