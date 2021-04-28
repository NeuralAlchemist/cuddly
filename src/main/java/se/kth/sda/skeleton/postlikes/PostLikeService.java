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

@Service
public class PostLikeService {


    private PostRepository postRepository;
    private PostLikeRepository postLikeRepository;
    private AuthService authService;
    private UserRepository userRepository;

    @Autowired
    public PostLikeService(PostRepository postRepository, PostLikeRepository postLikeRepository, AuthService authService, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

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
