import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/UsersRoutes';
import booksRouter from './routes/BooksRoutes';
import authRouter from './routes/AuthRoutes';
import authorization from './auth';


//App
const app = express(); //Initialize my app server
app.config = config; //Share my global configs
app.datasource = datasource(app); //Share my models
const auth = authorization(app); //Initialize my passport
app.auth = auth; //Share Authenticate for others modules


app.set('port', 8000);
app.use(bodyParser.json());
app.use(auth.initialize());

//routes
usersRouter(app);
booksRouter(app);
authRouter(app);

export default app;
