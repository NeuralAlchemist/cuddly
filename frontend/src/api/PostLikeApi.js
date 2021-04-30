import Api from "./Api";

class PostLikeApi {

    addLike(postId) {
        return Api.post('/posts/' + postId + '/likes');
    }
}

export default new PostLikeApi();