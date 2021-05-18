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

  followBuddy(userId) {
    return Api.post('/follow/' + userId);
  }

  unfollowBuddy(userId) {
    return Api.delete('/unfollow/' + userId);
  }

  getBuddies() {
    return Api.get('/users/buddies');
  }

  getFollowers() {
    return Api.get('/users/followers');
  }
  
  uploadImage(userId, file){
    return Api.put('/users/image/' + userId, file);
  }

}

export default new UserApi();