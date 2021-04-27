package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/posts/{id}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long id){
        return ResponseEntity.ok(commentService.getAllComments(id));
    }

    @PostMapping("/posts/{id}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long id, @RequestBody Comment comment){
        commentService.createComment(id, comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment updatedComment){
        return ResponseEntity.ok(commentService.updateComment(id, updatedComment));
    }

    @DeleteMapping("/comments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
    }
}