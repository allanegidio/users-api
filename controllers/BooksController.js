import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data: data,
  statusCode: statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message
}, statusCode);

class BooksController {
  constructor(Books){
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
                     .then(books => defaultResponse(books))
                     .catch(error => errorResponse(error.message));
  }

  getById(id) {
    return this.Books.findOne({ where: { id: id }})
                     .then(book => defaultResponse(book))
                     .catch(error => errorResponse(error.message));
  }

  createBook(book) {
    return this.Books.create(book)
                     .then(createdBook => defaultResponse(createdBook, HttpStatus.CREATED))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  updateBook(book, id) {
    return this.Books.update(book, { where: { id: id }})
                     .then(updatedBook => defaultResponse(updatedBook))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  deleteBook(id) {
    return this.Books.destroy({ where: { id: id }})
                     .then(deletedBook => defaultResponse(deletedBook, HttpStatus.NO_CONTENT))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BooksController;
