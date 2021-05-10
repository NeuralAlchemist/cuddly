import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get('/users');
  }

  updateUserDescription(description) {
    return Api.put('/users', description);
  }
}

export default new UserApi();