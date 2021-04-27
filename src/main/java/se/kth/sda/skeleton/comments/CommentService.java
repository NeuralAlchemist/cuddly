package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostRepository;

import java.util.List;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private PostRepository postRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository){
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public Comment updateComment(Long id, Comment updatedComment) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        updatedComment.setRelatedPost(comment.getRelatedPost());
        updatedComment.setId(id);
        return  commentRepository.save(updatedComment);
    }

    public List<Comment> getAllComments(Long postId){
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return relatedPost.getComments();
    }


    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        commentRepository.delete(comment);
    }

    public void createComment(Long postId, Comment comment){
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        comment.setRelatedPost(relatedPost);
        commentRepository.save(comment);
    }
}