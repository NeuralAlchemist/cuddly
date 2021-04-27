package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    /**
     * Create a new post
     * @param post newly created post
     * @return http status created and post
     */
    @PostMapping("")
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(post));
    }

    /**
     * Return a list of all posts
     * @return status 200 and list of posts
     */
    @GetMapping("")
    public ResponseEntity <List<Post>>listAllPosts() {
        return ResponseEntity.ok(postService.listAllPosts());
    }

    /**
     * Return a specific post based on ID
     * @param id the id of the specific post
     * @return HTTP ok status of displaying post
     */
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id){
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    /**
     * Update a post based on ID
     * @param id ID of the post to edit
     * @param updatedPost new user-created body to update the post
     * @return HTTP ok status of updated post
     */
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost){
        Post post = postService.updatePost(id, updatedPost);
        return ResponseEntity.ok(post);
    }


}
