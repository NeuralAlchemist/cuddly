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

    createImagePost(contentFile){
        return Api.post('/posts/upload', contentFile);
    }

    uploadFile(file){
        return Api.post('/posts/test', file, {headers:{
            'Content-type': `multipart/form-data ; boundary = ???`
        }});
    }
}

export default new PostsApi();