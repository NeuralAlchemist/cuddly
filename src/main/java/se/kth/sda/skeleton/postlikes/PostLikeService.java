package se.kth.sda.skeleton.postlikes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostRepository;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserRepository;
import java.util.List;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for PostLike.
 */
@Service
public class PostLikeService {

    private PostRepository postRepository;
    private PostLikeRepository postLikeRepository;
    private AuthService authService;
    private UserRepository userRepository;

    /**
     * Constructs a PostLikeService assigns its {@code postRespository}, {@code postLikeRepository},
     * {@code authService} and {@code userRepository}
     * @param postRepository an object that implements interface PostRepository
     * @param postLikeRepository an object that implements interface PostLikeRepository
     * @param authService an object that implements interface AuthService
     * @param userRepository an object that implements interface UserRepository
     */
    @Autowired
    public PostLikeService(PostRepository postRepository, PostLikeRepository postLikeRepository, AuthService authService, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * Adds a like to the given post an throws a {@link ForbiddenException} if the post has not been already liked.
     * @param postId the post to which a like is to be added
     * @return the saved PostLike if there is no like on the given post
     * @throws ForbiddenException if the post has not been already liked.
     */
    public PostLike addLike(Long postId){
        Post likedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        String loggedUserEmail = authService.getLoggedInUserEmail();
        User loggedUser = userRepository.findByEmail(loggedUserEmail);
        List<PostLike> listOfAllLikedByUser = loggedUser.getLikedPosts();
        for(PostLike postLike :listOfAllLikedByUser){
            if(postLike.getLikedPost().getId().equals(postId)){
                throw new ForbiddenException();
            }
        }
        PostLike newPostLike = new PostLike();
        newPostLike.setLikedPost(likedPost);
        newPostLike.setLikedUser(loggedUser);
        return postLikeRepository.save(newPostLike);
    }
}
