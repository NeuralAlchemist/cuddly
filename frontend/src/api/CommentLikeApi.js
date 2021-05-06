import Api from "./Api";

class CommentLikeApi {

    getAllCommentLikes(commentId) {
        return Api.get('/comments/' + commentId + '/likes');
    }

    addCommentLike(commentId) {
        return Api.post('/comments/' + commentId + '/likes');
    }

    removeCommentLike(commentId) {
        return Api.delete('/comments/' + commentId + '/likes');
    }
}

export default new CommentLikeApi();