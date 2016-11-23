describe('Book Contract Test', () => {
  const Books = app.datasource.models.Books;
  const defaultBooks = {
    id: 1,
    name: 'Default Book',
    description: 'default description of book'
  };

  beforeEach((done) => {
    Books.destroy({ where: {}})
         .then(() => Books.create(defaultBooks))
         .then(() => done());
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = Joi.array()
                           .items(Joi.object().keys({
                             id: Joi.number(),
                             name: Joi.string(),
                             description: Joi.string(),
                             created_at: Joi.date().iso(),
                             updated_at: Joi.date().iso()
                           }));

      request.get('/books')
             .end((error, res) => {
               joiAssert(res.body, booksList);
               done(error);
             });

    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        name: 'New Book',
        description: 'new description for the book'
      };

      const bookContract = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      });

      request.post('/books')
             .send(newBook)
             .end((error, res) => {
               joiAssert(res.body, bookContract);
               done(error);
             });
    });
  });

  describe('Route GET /books/:id', () => {
    it('Should return a book by id', (done) => {
      const bookContract = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      });

      request.get('/books/1')
             .end((error,res) => {
               joiAssert(res.body, bookContract);
               done(error);
             });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'Book updated',
        description: 'description updated'
      };

      const updatedCount = Joi.array().items(1);

      request.put('/books/1')
             .send(updateBook)
             .end((error, res) => {
               joiAssert(res.body, updatedCount);
               done(error);
             });
    });

    describe('Route DELETE /books/:id', () => {
      it('should delete a book', (done) => {
        request.delete('/books/1')
               .end((error, res) => {
                 expect(res.statusCode).to.be.eql(204);
                 done(error);
               });
      });
    });
  });
});
