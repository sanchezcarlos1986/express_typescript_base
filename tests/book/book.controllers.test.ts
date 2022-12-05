import app from '../../src/app';
import request from 'supertest';
import {server} from '../../src';

describe('GET /books', () => {
  it('should return 403 due there is no token', async () => {
    await request(app)
      .get('/api/books')
      .expect(403)
      .expect('Content-Type', /application\/json/);
  });

  it('should return 200', async () => {
    await request(app)
      .get('/api/books')
      .set('token', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  server.close();
});
