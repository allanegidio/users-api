import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import bodyParser from 'body-parser';

//App
const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 8000);
app.use(bodyParser.json());

//models
const Users = app.datasource.models.Users;

app.route('/users')
   .post((req, res) => {
     Users.create(req.body)
          .then(user => res.json(user))
          .catch(error => res.status(412));
   })
   .get((req, res) => {
      Users.findAll({})
           .then(users => res.json(users))
           .catch(error => res.status(412));
   });

app.route('/users/:id')
   .get((req, res) => {
      Users.findOne({ where: req.params })
           .then(user => res.json(user))
           .catch(error => res.status(412));
   })
   .put((req, res) => {
      Users.update(req.body, { where: req.params })
           .then(updatedUser => res.json(updatedUser))
           .catch(error => res.status(412));
   })
   .delete((req, res) => {
     Users.destroy({ where: req.params })
          .then(deletedUser => res.sendStatus(204))
          .catch(error => res.status(412));
   });

export default app;
