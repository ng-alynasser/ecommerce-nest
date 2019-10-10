import * as request from 'supertest';
import { RegisterDTO, LoginDTO } from '../src/auth/auth.dto';
import { app } from './constants';
import { HttpStatus } from '@nestjs/common';

describe('Authorization', () => {
  const user: RegisterDTO = {
    username: 'username',
    password: 'password',
  };

  const sellerRegister: RegisterDTO = {
    username: 'seller',
    password: 'password',
    seller: true,
  };

  const sellerLogin: LoginDTO = {
    username: 'seller',
    password: 'password',
  };

  let userToken: string;
  let sellerToken: string;

  it('should register user', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should register seller', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(sellerRegister)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('seller');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registeration', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exist');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login user', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        userToken = body.token;

        expect(userToken).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should login seller', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(sellerLogin)
      .expect(({ body }) => {
        sellerToken = body.token;

        expect(sellerToken).toBeDefined();
        expect(body.user.username).toEqual('seller');
        expect(body.user.password).toBeUndefined();
        expect(body.user.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });
});
