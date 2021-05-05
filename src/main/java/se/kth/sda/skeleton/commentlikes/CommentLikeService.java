package se.kth.sda.skeleton.commentlikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.comments.CommentRepository;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.postlikes.PostLike;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserRepository;
import java.util.List;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for PostLike.
 */
@Service
public class CommentLikeService {

    private CommentRepository commentRepository;
    private CommentLikeRepository commentLikeRepository;
    private AuthService authService;
    private UserRepository userRepository;

    /**
     * Constructs a CommentLikeService assigns its {@code commentRepository}, {@code commentLikeRepository},
     * {@code authService} and {@code userRepository}
     *
     * @param commentRepository     an object that implements interface PostRepository
     * @param commentLikeRepository object that implements interface PostLikeRepository
     * @param authService           an object that implements interface AuthService
     * @param userRepository        an object that implements interface UserRepository
     */
    @Autowired
    public CommentLikeService(CommentRepository commentRepository, CommentLikeRepository commentLikeRepository, AuthService authService, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.commentLikeRepository = commentLikeRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * Adds a like to the given comment an throws a {@link ForbiddenException} if the comment has not been already liked by the same user.
     *
     * @param commentId the comment to which a like is to be added
     * @return the saved CommentLike if there is no like on the given comment
     * @throws ForbiddenException if the comment has not been already liked by the user.
     */
    public CommentLike addCommentLike(Long commentId) {
        Comment likedComment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String loggedUserEmail = authService.getLoggedInUserEmail();
        User loggedUser = userRepository.findByEmail(loggedUserEmail);

        List<CommentLike> listOfCommentsLikedByUser = loggedUser.getLikedComments();
        for (CommentLike commentLike : listOfCommentsLikedByUser) {
            if (commentLike.getLikedComment().getId().equals(commentId)) {
                throw new ForbiddenException();
            }
        }
        CommentLike newCommentLike = new CommentLike();
        newCommentLike.setLikedComment(likedComment);
        newCommentLike.setLikedCommentUser(loggedUser);
        return commentLikeRepository.save(newCommentLike);
    }

    /**
     * Returns all Like of a Comment with the given {@code commentId} or throws a {@link ResourceNotFoundException} if there is no
     * Comment with the given {@code commentId}.
     *
     * @param commentId the Comment whose entire list of Likes is returned
     * @return a list of Likes of the Comment with id equal to {@code commentId}
     * @throws ResourceNotFoundException if there is no Comment with the given {@code commentId}
     */
    public List<CommentLike> getAllLikes(Long commentId) {
        Comment relatedComment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        return relatedComment.getListOfCommentLikes();
    }

    /**
     * Removes a like to the given comment an throws a {@link ForbiddenException} if the comment has not been already liked.
     * @param commentId the comment to which a like is to be removed
     * @throws ForbiddenException if the comment has not been already liked.
     */
    public void removeCommentLike(Long commentId){
        commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String loggedUserEmail = authService.getLoggedInUserEmail();
        User loggedUser = userRepository.findByEmail(loggedUserEmail);

        List<CommentLike> listOfLikedComments = loggedUser.getLikedComments();
        for(CommentLike commentLike : listOfLikedComments){
            if(commentLike.getLikedComment().getId().equals(commentId)){
                loggedUser.getLikedComments().remove(commentLike);
                commentLikeRepository.delete(commentLike);
                return;
            }
        }
        throw new ForbiddenException();
    }
}