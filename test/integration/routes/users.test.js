describe('Users Routes Test Integration', () => {
    const Users = app.datasource.models.Users;
    const jwtSecret = app.config.jwtSecret;

    const defaultUser = {
      id: 1,
      name: 'Default User',
      email: 'defaultuser@outlook.com',
      password: 'test123'
    };

    const defaultUserForAuth = {
      name: 'User authorized',
      email: 'userauthorized@outlook.com',
      password: 'test123'
    };

    let token;

    //Limpa o banco, insere e termina
    beforeEach((done) => {
      Users.destroy({ where: {}})
           .then(() => Users.create(defaultUserForAuth))
           .then(user => {
             Users.create(defaultUser)
                  .then(() => {
                    token = jwt.encode({ id: user.id }, jwtSecret);
                    done();
                  });
           });
    });

    describe('Route GET /users', () => {
        it('Should return a list of users', (done) => {
            request.get('/users')
                   .set('Authorization', `JWT ${token}`)
                   .end((error, res) => {
                      expect(res.body[0].id).to.be.eql(defaultUser.id);
                      expect(res.body[0].name).to.be.eql(defaultUser.name);
                      expect(res.body[0].email).to.be.eql(defaultUser.email);
                      done(error);
            });
        });
    });

    describe('Route GET /users/:id', () => {
        it('Should return a user by id', (done) => {
            request.get('/users/1')
                   .set('Authorization', `JWT ${token}`)
                   .end((error, res) => {
                      expect(res.body.id).to.be.eql(defaultUser.id);
                      expect(res.body.name).to.be.eql(defaultUser.name);
                      expect(res.body.email).to.be.eql(defaultUser.email);
                      done(error);
                   });
        });
    });

    describe('Route POST /users', () => {
        it('Should create a user', (done) => {
            const newUser = {
              id: 2,
              name: 'New user',
              email: 'newuser@outlook.com',
              password: 'newtest'
            };

            request.post('/users')
                   .set('Authorization', `JWT ${token}`)
                   .send(newUser)
                   .end((error, res) => {
                      expect(res.body.id).to.be.eql(newUser.id);
                      expect(res.body.name).to.be.eql(newUser.name);
                      expect(res.body.email).to.be.eql(newUser.email);

                      done(error);
                   });
        });
    });

    describe('Route PUT /users/:id', () => {
        it('Should update a user', (done) => {
            const updatedUser = {
              id: 1,
              name: 'User Updated',
              email: 'userupdated@outlook.com'
            };

            request.put('/users/1')
                   .set('Authorization', `JWT ${token}`)
                   .send(updatedUser)
                   .end((error, res) => {
                      expect(res.body).to.be.eql([1]);
                      done(error);
                   });
        });
    });

    describe('Route DELETE /users/:id', () => {
        it('Should delete a user', (done) => {
            request.delete('/users/1')
                   .set('Authorization', `JWT ${token}`)
                   .end((error, res) => {
                      expect(res.statusCode).to.be.eql(204);
                      done(error);
                   });
        });
    });
});
