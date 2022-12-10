import 'isomorphic-fetch';
import app from '../../src/app';
import request from 'supertest';
import {server} from '../../src';

describe('GET /users', () => {
  it('should return 403 due there is no token', async () => {
    await request(app)
      .get('/api/users')
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  it('should return 200 getting all users', async () => {
    await request(app)
      .get('/api/users')
      .set('authorization', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should return 200 getting one user by id', async () => {
    await request(app)
      .get('/api/users/1')
      .set('authorization', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  server.close();
});
