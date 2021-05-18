package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of Comment as RESTfull webservices.
 */
@RestController
public class CommentController {
    private CommentService commentService;

    /**
     * Constructs a CommentController and automatically assigns its {@code commentService} field.
     * @param commentService an object that implements interface CommentService
     */
    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    /**
     * Handler method for endpoint "/posts/{postId}/comments" with GET HttpRequest. Returns a {@link ResponseEntity}
     * containing the list of Comments associated with a Post of the given {@code postId} and HTTP status {@code OK}.
     * @param postId the Post whose entire list of Comments is returned
     * @return {@link ResponseEntity} containing the list of Comments associated with a Post of the given {@code postId}
     * and HTTP status {@code OK}
     */
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long postId){
        return ResponseEntity.ok(commentService.getAllComments(postId));
    }

    /**
     * Handler method for endpoint "/posts/{postId}/comments" with POST HttpRequest. Returns a {@link ResponseEntity} containing the created
     * comment and HTTP status {@code OK}. Requires that the HttpRequest from client include Comment object {@code comment}
     * which is the Comment to be created.
     * @param postId the Post for whom a new Comment is created
     * @param comment the comment that will be associated with the Post whose postId is {@code postId}
     * @return {@link ResponseEntity} containing the created Comment and HTTP status {@code OK}
     */
    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long postId, @RequestBody Comment comment){
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(postId, comment));
    }

    /**
     * Create a new comment with image/video
     * @param file the contentFile to be added to the comment
     * @param text  the contentText of the comment
     * @return http status created and comment
     */
    @PostMapping("/posts/{postId}/comments/upload")
    public ResponseEntity<Comment> createImageComment(@RequestParam("file") MultipartFile file, @RequestParam("text") String text, @PathVariable Long postId){
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createCommentImage(text, file, postId));
    }

    /**
     * Handler method for endpoint "posts/{postId}/comments/{postId}" with PUT HttpRequest. Returns a {@link ResponseEntity} containing the updated Comment
     * relating to the given {@code postId} and HTTP status {@code OK}.
     * @param contentText the text that will be updated to the Comment given by {@code commentId}
     * @param commentId the postId used to find the Comment associated with it
     * @param postId the postId used to find the Post associated with the Comment
     * @return {@link ResponseEntity} containing updated Comment of the given {@code postId} and HTTP status {@code OK}
     */
    @PutMapping("/posts/{postId}/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long postId, @PathVariable Long commentId, @RequestParam("text") String contentText){
        return ResponseEntity.ok(commentService.updateComment(postId, commentId, contentText));
    }

    /**
     * Handler method for endpoint "/posts/{postId}/comments/{postId}" with DELETE HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Deletes the Comment given by {@code postId}.
     * @param commentId the postId used to find the Comment associated with it and delete it
     */
    @DeleteMapping("/posts/{postId}/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long commentId){
        commentService.deleteComment(commentId);
    }
}