import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

const tasks = {

};
let ids = 1;

fastify.post('/task', (request, reply) => {
  const { name } = request.body;
  const id = ids++;

  tasks[id] = {
    id,
    name,
    isCompleted: false,
  }

  reply.send(tasks);
});

fastify.get('/task', (request, reply) => {
  reply.send(tasks);
});

fastify.patch('/task/isCompleted/:id', (request, reply) => {
  const {params: { id }} = request;

  tasks[id].isCompleted = !tasks[id].isCompleted;
  reply.send(tasks);
});

fastify.patch('/task/:id', (request, reply) => {
  const { params: { id }, body: { name } } = request;

  tasks[id].name = name;
  reply.send(tasks);
});

fastify.delete('/task/:id', (request, reply) => {
  const { params: { id } } = request;

  delete tasks[id];

  reply.send(tasks);
});

export default fastify;
