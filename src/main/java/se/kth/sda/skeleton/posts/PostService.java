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

    /**
     * Return a list of all posts
     *
     * @return list of posts in reverse order from postRepository
     */
    public List<Post> listAllPosts() {
        List<Post> posts = postRepository.findAll();
        Collections.reverse(posts); //Shows newer posts first
        return posts;
    }

    /**
     * Return a specific post based on ID
     *
     * @param id the id of the specific post
     * @return a post
     */
    public Post getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return post;
    }

    /**
     * Create a post
     *
     * @param newPost newly created post
     * @return newly created post
     */
    public Post createPost(Post newPost) {
        Post post = postRepository.save(newPost);
        return post;
    }

    /**
     * Update a post based on ID
     *
     * @param id          ID of the post to edit
     * @param updatedPost newly created body to update the post
     * @return updated post
     */
    public Post updatePost(Long id, Post updatedPost) {
        postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        updatedPost.setId(id);
        Post post = postRepository.save(updatedPost);
        return post;
    }
    
    /**
     * Delete a post based on ID
     *
     * @param id ID of the post to delete
     */
    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        postRepository.delete(post);
    }
}
