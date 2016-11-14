describe('User Books', () => {
    const Users = app.datasource.models.Users;
    const defaultUsers = {
      id: 1,
      name: 'Default User',
      email: 'default@outlook.com'
    };

    //Limpa o banco, insere e termina
    beforeEach((done) => {
      Users.destroy({ where: {}})
           .then(() => Users.create(defaultUsers))
           .then(() => done());
    });

    describe('Route GET /users', () => {
        it('Should return a list of users', (done) => {
            const usersList = Joi.array().items(Joi.object().keys({
              id: Joi.number(),
              name: Joi.string(),
              email: Joi.string(),
              created_at: Joi.date().iso(),
              updated_at: Joi.date().iso()
            }));

            request.get('/users')
                   .end((error, res) => {
                      joiAssert(res.body, usersList);
                      done(error);
            });
        });
    });

    describe('Route GET /users/:id', () => {
        it('Should return a user by id', (done) => {
            const user = Joi.object().keys({
              id: Joi.number(),
              name: Joi.string(),
              email: Joi.string(),
              created_at: Joi.date().iso(),
              updated_at: Joi.date().iso()
            });

            request.get('/users/1')
                   .end((error, res) => {
                      joiAssert(res.body, user);
                      done(error);
                   });
        });
    });

    describe('Route POST /users', () => {
        it('Should create a user', (done) => {
            const newUser = {
              id: 2,
              name: 'New User',
              email: 'newuser@outlook.com'
            };

            const user = Joi.object().keys({
              id: Joi.number(),
              name: Joi.string(),
              email: Joi.string(),
              created_at: Joi.date().iso(),
              updated_at: Joi.date().iso()
            });

            request.post('/users')
                   .send(newUser)
                   .end((error, res) => {
                      joiAssert(res.body, user);
                      done(error);
                   });
        });
    });

    describe('Route PUT /users/:id', () => {
        it('Should update a user', (done) => {
            const updateUser = {
              id: 1,
              name: 'User Updated',
              email: 'userupdated@outlook.com'
            };

            const updatedCount = Joi.array().items(1);

            request.put('/users/1')
                   .send(updateUser)
                   .end((error, res) => {
                      joiAssert(res.body, updatedCount);
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
