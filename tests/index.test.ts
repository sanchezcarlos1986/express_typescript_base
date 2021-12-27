import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Task from '../models/Task';
import {server} from '..';

const api = supertest(app);

beforeAll(async () => {
  await Task.deleteMany({});
});

describe('POST /tasks', () => {
  it('should return 200', async () => {
    const newTask = {
      title: 'new note about City Pop',
      description: 'this is my description',
    };

    await api
      .post('/api/tasks')
      .send(newTask)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/tasks');
    expect(response.body[response.body.length - 1].title).toContain(
      newTask.title,
    );
  });
});

describe('GET /tasks', () => {
  it('should return 200', async () => {
    await api
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/tasks');
    expect(response.body).toHaveLength(1);
  });
});

describe('GET /tasks/:id', () => {
  it('should return 200', async () => {
    const {body: tasks} = await api.get('/api/tasks');
    const id = tasks[0]._id;
    await api
      .get(`/api/tasks/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const {body: task} = await api.get(`/api/tasks/${id}`);

    expect(task.title).toContain('new note about City Pop');
  });
});

describe('PUT /tasks/:id', () => {
  it('should return 200', async () => {
    const {body: tasks} = await api.get('/api/tasks');
    const [task] = tasks;
    const id = task._id;

    const newTitle = 'lalala';

    await api
      .put(`/api/tasks/${id}`)
      .send({
        ...task,
        title: newTitle,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get(`/api/tasks/${id}`);
    console.log('response:', response.body);

    expect(response.body.title).toBe(newTitle);
  });
});

describe('DELETE /tasks/:id', () => {
  it('should return 200', async () => {
    const {body: tasks} = await api.get('/api/tasks');
    const id = tasks[0]._id;
    await api.delete(`/api/tasks/${id}`).expect(200);

    const response = await api.get('/api/tasks');
    expect(response.body).toHaveLength(0);
  });
});

afterAll(async () => {
  mongoose.connection.close();
  server.close();
});
