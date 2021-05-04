package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of Post as RESTful webservices.
 */
@RestController
@RequestMapping("/posts")
public class PostController {

    PostService postService;

    /**
     * Constructs a PostController and automatically assigns its postService field.
     *
     * @param postService an object that implements interface PostService
     */
    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    /**
     * Create a new post
     *
     * @param post newly created post
     * @return http status created and post
     */
    @PostMapping("")
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(post));
    }

    /**
     * Create a new post with image
     * @param file the contentFile to be added to the post
     * @param text  the contentText of the post
     * @return http status created and post
     */
    @PostMapping(value="/upload", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Post> createImagePost(@RequestParam("contentFile") MultipartFile file, @RequestParam("contentText") String text){

        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPostImage(text, file));
    }

    /**
     * Return a list of all posts
     *
     * @return status 200 and list of posts
     */
    @GetMapping("")
    public ResponseEntity<List<Post>> listAllPosts() {
        return ResponseEntity.ok(postService.listAllPosts());
    }

    /**
     * Return a specific post based on ID
     *
     * @param postId the id of the specific post
     * @return HTTP ok status of displaying post
     */
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        Post post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    /**
     * Update a post based on ID
     *
     * @param postId ID of the post to edit
     * @param updatedPost newly created body to update the post
     * @return status 200 and updated post
     */
    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post updatedPost) {
        Post post = postService.updatePost(postId, updatedPost);
        return ResponseEntity.ok(post);
    }

    /**
     * Delete a post based on ID
     *
     * @param postId ID of the post to delete
     */
    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
    }

}
