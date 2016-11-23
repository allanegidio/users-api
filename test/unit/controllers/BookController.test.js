import BooksController from '../../../controllers/BooksController';

describe('Controllers: Books', () => {
  describe('GET all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function()
      };

      const expectedBooks = [
        {
          id: 1,
          name: 'Default Book',
          description: 'Default description for the book'
        }
      ];

      const booksController = new BooksController(Books);

      //Mock na funcao findall do modelo Books e devolvendo expectedBooks.
      td.when(Books.findAll({}))
        .thenResolve(expectedBooks);

      return booksController.getAll()
                            .then(books => expect(books.data).to.be.eql(expectedBooks));

    });
  });

  describe('GET a book by id: getById(id)', () => {
    it('should return a book by id', () => {
      const Books = {
        findOne: td.function()
      };

      const expectedBook = {
        id: 1,
        name: 'Default Book',
        description: 'Default description for the book'
      };

      const booksController = new BooksController(Books);

      td.when(Books.findOne({ where: { id: 1}}))
        .thenResolve(expectedBook);

      return booksController.getById(1)
                            .then(book => expect(book.data).to.be.eql(expectedBook));

    });
  });

  describe('POST a book : createBook(book)', () => {
    it('should create a book', () => {
        const Books = {
          create: td.function()
        };

        const newBook = {
          name: 'New Book Test',
          description: 'New Book for test controller'
        };

        const expectedBook = {
          id: 1,
          name: 'New Book Test',
          description: 'New Book for test controller'
        };

        const booksController = new BooksController(Books);

        td.when(Books.create(newBook))
          .thenResolve(expectedBook);

        return booksController.createBook(newBook)
                              .then(book => {
                                expect(book.data).to.be.eql(expectedBook);
                                expect(book.statusCode).to.be.eql(201);
                              });
    });
  });

  describe('PUT a book: updateBook(book, id)', () => {
    it('should update a book', () => {
      const Books = {
        update: td.function()
      };

      const requestBody = {
        id: 1,
        name: 'Book updated',
        description: 'book description updated'
      };

      const expectedBook = {
        id: 1,
        name: 'Book updated',
        description: 'book description updated'
      };

      const booksController = new BooksController(Books);

      td.when(Books.update(requestBody, { where: { id: 1}}))
        .thenResolve(expectedBook);

      return booksController.updateBook(requestBody, 1)
                            .then(updatedBook => expect(updatedBook.data).to.be.eql(expectedBook));

    });
  });

  describe('DELETE a book: deleteBook(book)', () => {
    it('should delete a book', () => {
      const Books = {
        destroy: td.function()
      };

      const booksController = new BooksController(Books);

      td.when(Books.destroy({where: { id: 1}}))
        .thenResolve({});

      return booksController.deleteBook(1)
                            .then(deletedBook => expect(deletedBook.statusCode).to.be.eql(204))

    });
  });
});
