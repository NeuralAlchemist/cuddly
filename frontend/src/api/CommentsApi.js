import Api from "./Api";

class CommentsApi {
    getAllComments(postId) {
        return Api.get('/posts/' + postId + '/comments');
    }

    createComment(postId, comment) {
        return Api.post('/posts/' + postId + '/comments', comment);
    }

    updateComment(id, comment) {
        return Api.post('/comments' + id, comment);
    }

    deleteComment(id) {
        return Api.delete('/comments/' + id);
    }
}

export default new CommentsApi();