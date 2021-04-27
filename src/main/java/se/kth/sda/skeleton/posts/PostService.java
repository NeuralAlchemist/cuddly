package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;

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
        return posts;
    }

    public Post getPostById(Long id){
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return post;
    }
}
