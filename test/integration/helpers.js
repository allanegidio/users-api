import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import jwt from 'jwt-simple';

global.app = app;
global.jwt = jwt;
global.request = supertest(app);
global.expect = chai.expect;
