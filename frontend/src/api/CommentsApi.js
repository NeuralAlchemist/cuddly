import Api from "./Api";

class CommentsApi {
    getAllComments(postId) {
        return Api.get('/posts/' + postId + '/comments');
    }

    createComment(postId, comment) {
        return Api.post('/posts/' + postId + '/comments', comment);
    }

    updateComment(postId, commentId, comment) {
        return Api.put('/posts/' + postId + '/comments/' + commentId, comment);
    }

    deleteComment(postId, commentId) {
        return Api.delete('/posts/' + postId + '/comments/' + commentId);
    }
    createImageComment(contentFile){
        return Api.post('/posts/' + postId + '/comments/upload', contentFile);
    }
}

export default new CommentsApi();