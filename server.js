import { fastify } from 'fastify';

import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';


const { PORT } = process.env;

console.log('Variáveis de ambiente carregadas:', { PORT });
const server = fastify();
const database = new DatabaseMYSQL();
server.get('/', async (request, reply) => {
    return { message: 'API server - Barbearia' };
});

server.post('/users', async (request, reply) => {
    const { name, email, password } = request.body;
    await database.create({
        name,
        email,
        password,
    });

    console.log(await database.list());
    return reply.status(201).send();
});

server.get('/users', async (request, reply) => {
    const { search } = request.query;
    console.log(search);
    const users = await database.list(search);
    return users;
});

server.put('/users/:id', async (request, reply) => {
    const usersID = request.params.id;
    const { name, email, password } = request.body;
    await database.update(usersID, {
        name,
        email,
        password,
    });

    return reply.status(204).send();
});

server.delete('/users/:id', async (request, reply) => {
    const usersID = request.params.id;
    await database.delete(usersID);
    return reply.status(204).send();
});

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
