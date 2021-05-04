package se.kth.sda.skeleton.postlikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.comments.Comment;

import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of PostLike as RESTful webservices.
 */
@RestController
@RequestMapping("/posts")
public class PostLikeController {

    PostLikeService postLikeService;

    @Autowired
    public PostLikeController(PostLikeService postLikeService) {
        this.postLikeService = postLikeService;
    }

    @PostMapping("/{postId}/likes")
    public ResponseEntity<PostLike> addLike(@PathVariable Long postId){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(postLikeService.addLike(postId));
    }

    /**
     * Handler method for endpoint "/posts/{postId}/likes" with GET HttpRequest. Returns a {@link ResponseEntity}
     * containing the list of Likes associated with a Post of the given {@code postId} and HTTP status {@code OK}.
     * @param postId the Post whose entire list of Likes is returned
     * @return {@link ResponseEntity} containing the list of Likes associated with a Post of the given {@code postId}
     * and HTTP status {@code OK}
     */
    @GetMapping("/{postId}/likes")
    public ResponseEntity<List<PostLike>> getAllLikes(@PathVariable Long postId){
        return ResponseEntity.ok(postLikeService.getAllLikes(postId));
    }

    /**
     * Handler method for endpoint "/posts/{postId}/likes" with DELETE HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Deletes the like made by the logged in user for post given by {@code postId}
     * @param postId the post for which the user's like will be removed
     */
    @DeleteMapping("/{postId}/likes")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeLike(@PathVariable Long postId){
        postLikeService.removeLike(postId);
    }
}
