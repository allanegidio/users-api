import express from 'express';
import config from './config/config';
import datasource from './config/datasource';

//App
const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 8000);

//models
const Users = app.datasource.models.Users;

app.route('/users')
   .get((req, res) => {
      Users.findAll({})
           .then(result => res.json(result))
           .catch(error => res.status(412));
   });






export default app;
