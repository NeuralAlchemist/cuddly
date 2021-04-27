package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostRepository;
import java.util.List;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for Comments.
 */
@Service
public class CommentService {
    private CommentRepository commentRepository;
    private PostRepository postRepository;

    /**
     * Constructs a CommentService and automatically assigns its {@code postRepository} and {@code commentRepository} fields.
     * @param commentRepository an object that implements interface CommentRepository
     * @param postRepository an object that implements interface PostRepository
     */
    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository){
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    /**
     * Updates a Comment for the given Comment {@code id} or throws a {@link ResourceNotFoundException} if there is no Post with the given {@code id}.
     * @param id the Comment which will be updated
     * @param updatedComment the Comment that will added to the Comment given by {@code id}
     * @throws ResourceNotFoundException if there is no Post with the given {@code id}
     */
    public Comment updateComment(Long id, Comment updatedComment) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        updatedComment.setRelatedPost(comment.getRelatedPost());
        updatedComment.setId(id);
        return  commentRepository.save(updatedComment);
    }

    /**
     * Returns all Comments of a Post with the given {@code postId} or throws a {@link ResourceNotFoundException} if there is no
     * Post with the given {@code postId}.
     * @param postId the Post whose entire list of Comments is returned
     * @return a list of Comments of the Post with id equal to {@code postId}
     * @throws ResourceNotFoundException if there is no Post with the given {@code postId}
     */
    public List<Comment> getAllComments(Long postId){
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return relatedPost.getComments();
    }

    /**
     * Deletes a Comment with the given {@code id} or throws a {@link ResourceNotFoundException} if there is no
     * Comment with the given {@code id}.
     * @param id the id used to find the Comment associated with it and delete it
     * @throws ResourceNotFoundException if there is no Comment with the given {@code id}
     */
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        commentRepository.delete(comment);
    }

    /**
     * Creates a Comment for a Post with the given {@code postId} or throws a {@link ResourceNotFoundException} if there is no Post with the given {@code postId}.
     * @param postId the Post for whom a new Comment is created
     * @param comment the Comment that will be associated with the Post whose id is {@code postId}
     * @return the created comment
     * @throws ResourceNotFoundException if there is no Post with the given {@code postId}
     */
    public Comment createComment(Long postId, Comment comment){
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        comment.setRelatedPost(relatedPost);
        return commentRepository.save(comment);
    }
}