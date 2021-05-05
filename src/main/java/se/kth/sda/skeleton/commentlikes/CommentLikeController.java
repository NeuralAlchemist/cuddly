package se.kth.sda.skeleton.commentlikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of CommentLike as RESTful webservices.
 */
@RestController
@RequestMapping("/comments")
public class CommentLikeController {

    CommentLikeService commentLikeService;

    @Autowired
    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    /**
     * Handler method for endpoint "/comments/{commentId}/likes" with POST HttpRequest. Returns a {@link ResponseEntity} containing the created
     * comment like and HTTP status {@code OK}.
     *
     * @param commentId the Comment for whom a new CommentLike is added
     * @return {@link ResponseEntity} containing the added CommentLike and HTTP status {@code OK}
     */
    @PostMapping("/{commentId}/likes")
    public ResponseEntity<CommentLike> addLike(@PathVariable Long commentId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(commentLikeService.addCommentLike(commentId));
    }

    /**
     * Handler method for endpoint "/comments/{commentId}/likes" with GET HttpRequest. Returns a {@link ResponseEntity}
     * containing the list of Likes associated with a Comment of the given {@code commentId} and HTTP status {@code OK}.
     * @param commentId the Comment whose entire list of Likes is returned
     * @return {@link ResponseEntity} containing the list of Likes associated with a Comment of the given {@code commentId}
     * and HTTP status {@code OK}
     */
    @GetMapping("/{commentId}/likes")
    public ResponseEntity<List<CommentLike>> getAllLikes(@PathVariable Long commentId){
        return ResponseEntity.ok(commentLikeService.getAllLikes(commentId));
    }

    /**
     * Handler method for endpoint "/posts/{postId}/likes" with DELETE HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Deletes the like made by the logged in user for post given by {@code postId}
     * @param postId the post for which the user's like will be removed
     */
    @DeleteMapping("/{postId}/likes")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeLike(@PathVariable Long postId){
        commentLikeService.removeCommentLike(postId);
    }
}
