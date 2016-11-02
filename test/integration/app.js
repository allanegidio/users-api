describe('User Books', () => {
    const Users = app.datasource.models.Users;
    const defaultUsers = {
      id: 1,
      name: 'Allan Egidio'
    };

    //Limpa o banco, insere e termina
    beforeEach((done) => {
      Users.destroy({ where: {}})
           .then(() => Users.create(defaultUsers))
           .then(() => done());
    });

    describe('Route GET /users', () => {
        it('Should return a list of users', (done) => {
            request.get('/users')
                   .end((error, res) => {
                      expect(res.body[0].id).to.be.eql(defaultUsers.id);
                      expect(res.body[0].name).to.be.eql(defaultUsers.name);
                      done(error);
            });
        });
    });

    describe('Route GET /users/:id', () => {
        it('Should return a user by id', (done) => {
            request.get('/users/1')
                   .end((error, res) => {
                      console.log(res.body[0]);
                      expect(res.body.id).to.be.eql(defaultUsers.id);
                      expect(res.body.name).to.be.eql(defaultUsers.name);
                      done(error);
                   });
        });
    });

    describe('Route POST /users', () => {
        it('Should create a user', (done) => {
            const newUser = {
              id: 2,
              name: 'Allan Egidio'
            };

            request.post('/users')
                   .send(newUser)
                   .end((error, res) => {
                      expect(res.body.id).to.be.eql(newUser.id);
                      expect(res.body.name).to.be.eql(newUser.name);
                      done(error);
                   });
        });
    });

    describe('Route PUT /users/:id', () => {
        it('Should update a user', (done) => {
            const updateUser = {
              id: 1,
              name: 'Allan Egidio Atualizado'
            };

            request.put('/users/1')
                   .send(updateUser)
                   .end((error, res) => {
                      expect(res.body).to.be.eql([1]);
                      done(error);
                   });
        });
    });

    describe('Route DELETE /users/:id', () => {
        it('Should delete a user', (done) => {
            request.delete('/users/1')
                   .end((error, res) => {
                      expect(res.statusCode).to.be.eql(204);
                      done(error);
                   });
        });
    });
});
