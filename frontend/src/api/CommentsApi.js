import Api from "./Api";

class CommentsApi {
    getAllComments(postId) {
        return Api.get('/posts/' + postId + '/comments');
    }

    createComment(postId, comment) {
        return Api.post('/posts/' + postId + '/comments', comment);
    }

    updateComment(postId, commentId, comment) {
        return Api.post('/posts/' + postId + '/comments' + commentId, comment);
    }

    deleteComment(postId, commentId) {
        return Api.delete('/posts/' + postId + '/comments/' + commentId);
    }
}

export default new CommentsApi();