import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get('/users');
  }

  updateUser(updatedUser) {
    return Api.put('/users', updatedUser);
  }

  followBuddy(userId) {
    return Api.post('/follow/' + userId);
  }

  unfollowBuddy(userId) {
    return Api.delete('/unfollow/' + userId);
  }
}

export default new UserApi();