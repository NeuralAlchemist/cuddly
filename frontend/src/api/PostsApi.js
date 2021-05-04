import Api from "./Api";

class PostsApi {
    getAllPosts() {
        return Api.get('/posts');
    }

    getPostById(id) {
        return Api.get('/posts/' + id);
    }

    createPost(post) {
        return Api.post('/posts', post);
    }

    updatePost(post, id) {
        return Api.put('/posts/' + id, post);
    }

    deletePost(id) {
        return Api.delete('/posts/' + id);
    }

    createImagePost(text, file){
        return Api.post('/posts/upload', text, file);
    }
}

export default new PostsApi();