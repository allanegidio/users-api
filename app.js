import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/UsersRoutes';
import booksRouter from './routes/BooksRoutes';

//App
const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 8000);
app.use(bodyParser.json());

//routes
usersRouter(app);
booksRouter(app);

export default app;
