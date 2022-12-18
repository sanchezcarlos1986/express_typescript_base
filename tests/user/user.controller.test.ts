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

  // Get all
  it('should return 200 getting all users', async () => {
    await request(app)
      .get('/api/users')
      .set('authorization', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  // Post
  it('should return 200 creating one user', async () => {
    await request(app)
      .post('/api/users')
      .set('authorization', 'thebest1token')
      .send({
        name: 'carlos',
        lastName: 'sánchez',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  // Get one
  it('should return 200 getting one user by id', async () => {
    await request(app)
      .get('/api/users/1')
      .set('authorization', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  // Put
  it('should return 200 updating one user', async () => {
    await request(app)
      .put('/api/users/1')
      .set('authorization', 'thebest1token')
      .send({
        name: 'carlos',
        lastName: 'sánchez sánchez',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  // Delete
  it('should return 200 deleting one user', async () => {
    await request(app)
      .delete('/api/users/1')
      .set('authorization', 'thebest1token')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });
});

afterAll(async () => {
  server.close();
});
