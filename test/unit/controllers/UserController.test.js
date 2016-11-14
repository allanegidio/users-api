import UsersControllers from '../../../controllers/UsersController';

describe('Controllers: Users', () => {
  describe('Get all users: getAll()', () => {
    it('should return a list of users', () => {
      const Users = {
        findAll: td.function()
      };

      const expectedUsers = [
        {
          id: 1,
          nome: 'Allan Egidio',
          email: 'allan.egidio@outlook.com',
          created_at: '2016-08-06T23:55.36.692Z',
          updated_at: '2016-08-06T23:55.36.692Z'
        }
      ];

      td.when(Users.findAll({}))
        .thenResolve(expectedUsers);

      const usersController = new UsersControllers(Users);

      return usersController.getAll()
                            .then(users => expect(users.data).to.be.eql(expectedUsers));

    });
  });

  describe('Get users by Id: getById()', () => {
    it('should return a user by id', () => {
      const Users = {
        findById: td.function()
      };

      const expectedUser = {
        id: 1,
        nome: 'Allan Egidio',
        email: 'allan.egidio@outlook.com',
        created_at: '2016-08-06T23:55.36.692Z',
        updated_at: '2016-08-06T23:55.36.692Z'
      };

      td.when(Users.findById(1))
        .thenResolve(expectedUser);

      const usersController = new UsersControllers(Users);

      return usersController.getById(1)
                            .then(user => expect(user.data).to.be.eql(expectedUser));

    });
  });

  describe('Post a User: createUser(user)', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function()
      };

      const requestBody = {
          nome: 'New User'
      };

      const expectedUser = {
        id: 1,
        nome: 'New User',
        email: 'newuser@outlook.com',
        created_at: '2016-08-06T23:55.36.692Z',
        updated_at: '2016-08-06T23:55.36.692Z'
      };

      td.when(Users.create(requestBody))
        .thenResolve(expectedUser);

      const usersController = new UsersControllers(Users);

      return usersController.createUser(requestBody)
                            .then(user => {
                              expect(user.data).to.be.eql(expectedUser);
                              expect(user.statusCode).to.be.eql(201);
                            });

    });
  });

  describe('Put a User: updateUser(user, id)', () => {
    it('should update a user', () => {
      const Users = {
        update: td.function()
      };

      const requestBody = {
          id: 1,
          nome: 'New User Updated',
          email: 'emailupdated@outlook.com'
      };

      const expectedUser = {
        id: 1,
        nome: 'New User Updated',
        email: 'emailupdated@outlook.com',
        created_at: '2016-08-06T23:55.36.692Z',
        updated_at: '2016-08-06T23:55.36.692Z'
      };

      td.when(Users.update(requestBody, { where: { id: 1 }}))
        .thenResolve(expectedUser);

      const usersController = new UsersControllers(Users);

      return usersController.updateUser(requestBody, { id: 1 })
                            .then(user => expect(user.data).to.be.eql(expectedUser));

    });
  });

  describe('Delete a User: deleteUser(id)', () => {
    it('should delete a user', () => {
      const Users = {
        destroy: td.function()
      };

      td.when(Users.destroy({ where: { id: 1 }}))
        .thenResolve({});

      const usersController = new UsersControllers(Users);

      return usersController.deleteUser({ id: 1 })
                            .then(user => expect(user.statusCode).to.be.eql(204));

    });
  });

});
