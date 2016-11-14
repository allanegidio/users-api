import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/usersRoutes';

//App
const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 8000);
app.use(bodyParser.json());
const Users = app.datasource.models.Users;
usersRouter(app, Users);

//models




export default app;
