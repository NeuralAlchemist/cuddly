package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
     * Handler method for endpoint "/posts/{id}/comments" with GET HttpRequest. Returns a {@link ResponseEntity}
     * containing the list of Comments associated with a Post of the given {@code postId} and HTTP status {@code OK}.
     * @param id the Post whose entire list of Comments is returned
     * @return {@link ResponseEntity} containing the list of Comments associated with a Post of the given {@code postId}
     * and HTTP status {@code OK}
     */
    @GetMapping("/posts/{id}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long id){
        return ResponseEntity.ok(commentService.getAllComments(id));
    }

    /**
     * Handler method for endpoint "/posts/{id}/comments" with POST HttpRequest. Returns a {@link ResponseEntity} containing the created
     * comment and HTTP status {@code OK}. Requires that the HttpRequest from client include Comment object {@code comment}
     * which is the Comment to be created.
     * @param id the Post for whom a new Comment is created
     * @param comment the comment that will be associated with the Post whose id is {@code id}
     * @return {@link ResponseEntity} containing the created Comment and HTTP status {@code OK}
     */
    @PostMapping("/posts/{id}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long id, @RequestBody Comment comment){
        commentService.createComment(id, comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    /**
     * Handler method for endpoint "/comments/{id}" with GET HttpRequest. Returns a {@link ResponseEntity} containing a Comment with the
     * given {@code id} and HTTP status {@code OK}.
     * @param id the id used to find the Comment associated with it
     * @return {@link ResponseEntity} containing a Comment with the given {@code id} and HTTP status {@code OK}
     */
    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment){
        return ResponseEntity.ok(commentService.updateComment(id, updatedComment));
    }

    /**
     * Handler method for endpoint "/comments/{id}" with DELETE HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Deletes the Comment given by {@code id}.
     * @param id the id used to find the Comment associated with it and delete it
     */
    @DeleteMapping("/comments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }
}