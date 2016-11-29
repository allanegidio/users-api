describe('Books Routes Integration Test', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description for the book',
  };

  const defaultUser = {
    name: 'Test User',
    email: 'testuser@outlook.com',
    password: 'test123'
  };

  let token;

  //limpo o banco, crio meu livro padrao e termino a operacao;
  beforeEach((done) => {
    Users.destroy({ where: {}})
         .then(() => Users.create(defaultUser))
         .then(user => {
           Books.destroy({ where: {}})
                .then(() => Books.create(defaultBook))
                .then(() => {
                  token = jwt.encode({ id: user.id }, jwtSecret);
                  done();
                });
         });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request.get('/books')
             .set('Authorization', `JWT ${token}`)
             .end((error, res) => {
               expect(res.body[0].id).to.be.eql(defaultBook.id);
               expect(res.body[0].name).to.be.eql(defaultBook.name);
               expect(res.body[0].description).to.be.eql(defaultBook.description);
               done(error);
             });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', (done) => {
      request.get('/books/1')
             .set('Authorization', `JWT ${token}`)
             .end((error, res) => {
               expect(res.body.id).to.be.eql(defaultBook.id);
               expect(res.body.name).to.be.eql(defaultBook.name);
               expect(res.body.description).to.be.eql(defaultBook.description);
               done(error);
             });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'New book',
        description: 'a new description for the book'
      };

      request.post('/books')
             .set('Authorization', `JWT ${token}`)
             .send(newBook)
             .end((error, res) => {
               expect(res.body.id).to.be.eql(newBook.id);
               expect(res.body.name).to.be.eql(newBook.name);
               expect(res.body.description).to.be.eql(newBook.description);
               done(error);
             });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'Book Updated',
        description: 'Book description updated'
      };

      request.put('/books/1')
             .set('Authorization', `JWT ${token}`)
             .send(updateBook)
             .end((error, res) => {
               expect(res.body).to.be.eql([1]);
               done(error);
             });
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
