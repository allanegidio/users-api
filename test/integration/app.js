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
});
