import BooksController from '../controllers/BooksController';

export default (app) => {
  const booksController = new BooksController(app.datasource.models.Books);
  app.route('/books')
     .get((req, res) => {
       booksController.getAll()
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     })
     .post((req, res) => {
       booksController.createBook(req.body)
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     });

  app.route('/books/:id')
     .get((req, res) => {
       booksController.getById(req.params.id)
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     })
     .put((req, res) => {
       booksController.updateBook(req.body, req.params.id)
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     })
     .delete((req, res) => {
       booksController.deleteBook(req.params.id)
                      .then(response => {
                        res.status(response.statusCode);
                        res.json(response.data);
                      });
     });
}
