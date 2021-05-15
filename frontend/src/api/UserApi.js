import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get('/users');
  }

  updateUser(updatedUser) {
    return Api.put('/users', updatedUser);
  }

  getUserById(userId) {
    return Api.get('/users/' + userId);
  }

  getAllUsers() {
    return Api.get('/users/all');
  }
}

export default new UserApi();