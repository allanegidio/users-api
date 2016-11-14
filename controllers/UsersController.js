const defaultResponse = (data,statusCode = 200) => ({
  data: data,
  statusCode: statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class UserController {
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
                     .then(user => defaultResponse(user, 201))
                     .catch(error => errorResponse(error.message, 422));
  }

  updateUser(user, id){
    return this.Users.update(user, { where: id })
                     .then(updatedUser => defaultResponse(updatedUser))
                     .catch(error => errorResponse(error.message, 422));
  }

  deleteUser(id){
    return this.Users.destroy({where: id})
                     .then(deletedUser => defaultResponse(deletedUser, 204))
                     .catch(error => errorResponse(error.message, 422));
  }
}



export default UserController;
