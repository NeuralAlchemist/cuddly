package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;

import java.util.Collections;
import java.util.List;

@Service
public class PostService {

    PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> listAllPosts() {
        List<Post> posts = postRepository.findAll();
        Collections.reverse(posts);
        return posts;
    }

    public Post getPostById(Long id){
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return post;
    }

    public Post createPost(Post newPost) {
        Post post = postRepository.save(newPost);
        return post;
    }

    public Post updatePost(Long id, Post updatedPost) {
        postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        updatedPost.setId(id);
        Post post = postRepository.save(updatedPost);
        return post;
    }
}
