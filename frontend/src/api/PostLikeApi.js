import Api from "./Api";

class PostLikeApi {

    getAllPostLikes(postId) {
        return Api.get('/posts/' + postId + '/likes');
    }

    addLike(postId) {
        return Api.post('/posts/' + postId + '/likes');
    }

    removeLike(postId) {
        return Api.delete('/posts/' + postId + '/likes');
    }
}

export default new PostLikeApi();