import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get('/users');
  }

  updateUserDescription(updatedUser) {
    return Api.put('/users', updatedUser);
  }
}

export default new UserApi();