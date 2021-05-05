package se.kth.sda.skeleton.commentlikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.postlikes.PostLike;
import se.kth.sda.skeleton.postlikes.PostLikeService;

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
}
