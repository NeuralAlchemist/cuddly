package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostRepository;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents the service layer. It contains defined functionalities according to business logic for Comments.
 */
@Service
public class CommentService {
    private static String videoDirectory = System.getProperty("user.dir") + "/frontend/src/videos/comment";
    private CommentRepository commentRepository;
    private PostRepository postRepository;
    private AuthService authService;
    private UserRepository userRepository;

    /**
     * Constructs a CommentService and automatically assigns its {@code postRepository} and {@code commentRepository} fields.
     *
     * @param commentRepository an object that implements interface CommentRepository
     * @param postRepository    an object that implements interface PostRepository
     */
    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository, AuthService authService, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * Updates a Comment for the given Comment {@code commentId} or throws a {@link ResourceNotFoundException} if there is no Post with the given {@code commentId}.
     *
     * @param commentId      the Comment which will be updated
     * @param updatedComment the Comment that will added to the Comment given by {@code commentId}
     * @throws ResourceNotFoundException if there is no Post with the given {@code commentId}
     */
    public Comment updateComment(Long postId, Long commentId, Comment updatedComment) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(ResourceNotFoundException::new);
        String loggedInUserEmail = authService.getLoggedInUserEmail();
        User loggedInUser = userRepository.findByEmail(loggedInUserEmail);
        LocalDateTime createdTime = LocalDateTime.now();

        if (!loggedInUserEmail.equals(comment.getRelatedCommentUser().getEmail())) {
            throw new ForbiddenException();
        }
        updatedComment.setRelatedPost(postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new));
        updatedComment.setId(commentId);
        updatedComment.setCreatedTime(createdTime);
        updatedComment.setRelatedCommentUser(loggedInUser);

        return commentRepository.save(updatedComment);
    }

    /**
     * Returns all Comments of a Post with the given {@code postId} or throws a {@link ResourceNotFoundException} if there is no
     * Post with the given {@code postId}.
     *
     * @param postId the Post whose entire list of Comments is returned
     * @return a list of Comments of the Post with id equal to {@code postId}
     * @throws ResourceNotFoundException if there is no Post with the given {@code postId}
     */
    public List<Comment> getAllComments(Long postId) {
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return relatedPost.getRelatedComments();
    }

    /**
     * Deletes a Comment with the given {@code id} or throws a {@link ResourceNotFoundException} if there is no
     * Comment with the given {@code id}.
     *
     * @param id the id used to find the Comment associated with it and delete it
     * @throws ResourceNotFoundException if there is no Comment with the given {@code id}
     */
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String loggedInUserEmail = authService.getLoggedInUserEmail();
        if (loggedInUserEmail.equals(comment.getRelatedCommentUser().getEmail())) {
            comment.getRelatedCommentUser().getCreatedPosts().remove(comment);
            commentRepository.delete(comment);
        } else {
            throw new ForbiddenException();
        }
    }

    /**
     * Creates a Comment for a Post with the given {@code postId} or throws a {@link ResourceNotFoundException} if there is no Post with the given {@code postId}.
     *
     * @param postId  the Post for whom a new Comment is created
     * @param comment the Comment that will be associated with the Post whose id is {@code postId}
     * @return the created comment
     * @throws ResourceNotFoundException if there is no Post with the given {@code postId}
     */
    public Comment createComment(Long postId, Comment comment) {
        String email = authService.getLoggedInUserEmail();
        User relatedUser = userRepository.findByEmail(email);
        Post relatedPost = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        LocalDateTime createdTime = LocalDateTime.now();

        comment.setRelatedPost(relatedPost);
        comment.setRelatedCommentUser(relatedUser);
        comment.setCreatedTime(createdTime);

        relatedUser.getCreatedComments().add(comment);
        return commentRepository.save(comment);
    }

    /**
     * Create a comment with file
     *
     * @param text the contentText of the comment
     * @param file the contentFile to be added to the comment
     * @return newly created comment
     */
    public Comment createCommentImage(String text, MultipartFile file){
        Comment newComment = new Comment();
        String email = authService.getLoggedInUserEmail();
        LocalDateTime createdTime = LocalDateTime.now();
        User loggedInUser = userRepository.findByEmail(email);
        newComment.setContentText(text);
        newComment.setRelatedPostUser(loggedInUser);
        newComment.setCreatedTime(createdTime);
        newComment.setMediaType(file.getContentType());
        if(!file.isEmpty()){
            if(file.getContentType().contains("image")){
                byte[] bytes;
                try {
                    bytes = new byte[file.getBytes().length];
                    int i = 0;
                    for (byte b : file.getBytes()){
                        bytes[i++] = b;
                    }
                    newComment.setImage(bytes);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                try {
                    File directory = new File(videoDirectory);
                    if(!directory.exists()){
                        directory.mkdir();
                    }
                    Path fileName = Paths.get(videoDirectory, loggedInUser.getEmail().concat(file.getOriginalFilename()));
                    Files.write(fileName, file.getBytes());
                    newComment.setVideoName(fileName.getFileName().toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return commentRepository.save(newComment);
    }
}