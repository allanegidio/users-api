describe('Book Contract Test', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'default description of book'
  };

  const defaultUser = {
    name: 'Test User',
    email: 'testuser@outlook.com',
    password: 'test123'
  };

  let token;

  beforeEach((done) => {
    Users.destroy({ where: {}})
         .then(() => Users.create(defaultUser))
         .then(user => {
           Books.destroy({ where: {}})
                .then(() => Books.create(defaultBook))
                .then(() => {
                  token = jwt.encode({ id: user.id}, jwtSecret);
                  done();
                });
         });
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
             .set('Authorization', `JWT ${token}`)
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
             .set('Authorization', `JWT ${token}`)
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
             .set('Authorization', `${token}`)
             .end((error,res) => {
               joiAssert(res.body, bookContract);
               done(error);
             });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Book updated',
        description: 'description updated'
      };

      const updatedCount = Joi.array().items(1);

      request.put('/books/1')
             .set('Authorization', `JWT ${token}`)
             .send(updatedBook)
             .end((error, res) => {
               joiAssert(res.body, updatedCount);
               done(error);
             });
    });

    describe('Route DELETE /books/:id', () => {
      it('should delete a book', (done) => {
        request.delete('/books/1')
               .set('Authorization', `JWT ${token}`)
               .end((error, res) => {
                 expect(res.statusCode).to.be.eql(204);
                 done(error);
               });
      });
    });
  });
});
