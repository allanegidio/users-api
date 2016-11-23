import HttpStatus from 'http-status';

const defaultResponse = (data,statusCode = HttpStatus.OK) => ({
  data: data,
  statusCode: statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message
}, statusCode);

class UsersController {
  constructor(Users){
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
                     .then(users => defaultResponse(users))
                     .catch(error => errorResponse(error.message));
  }

  getById(id){
    return this.Users.findById(id)
                     .then(user => defaultResponse(user))
                     .catch(error => errorResponse(error.message));
  }

  createUser(user){
    return this.Users.create(user)
                     .then(createdUser => defaultResponse(createdUser, HttpStatus.CREATED))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  updateUser(user, id){
    return this.Users.update(user, { where: id })
                     .then(updatedUser => defaultResponse(updatedUser))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  deleteUser(id){
    return this.Users.destroy({where: id})
                     .then(deletedUser => defaultResponse(deletedUser, HttpStatus.NO_CONTENT))
                     .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}



export default UsersController;
