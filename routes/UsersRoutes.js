import UsersController from '../controllers/UsersController';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.Users);
  app.route('/users')
     .post((req, res) => {
       usersController.createUser(req.body)
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     })
     .get((req, res) => {
        usersController.getAll()
                       .then(response => {
                         res.status(response.statusCode);
                         res.json(response.data);
                       });
     });

  app.route('/users/:id')
     .get((req, res) => {
        usersController.getById(req.params.id)
                       .then(response => {
                         res.status(response.statusCode);
                         res.json(response.data);
                       });
     })
     .put((req, res) => {
        usersController.updateUser(req.body, req.params)
                       .then(response => {
                         res.status(response.statusCode);
                         res.json(response.data);
                       });
     })
     .delete((req, res) => {
        usersController.deleteUser(req.params)
                       .then(response => {
                         res.status(response.statusCode);
                         res.json(response.data);
                       });
     });
}
