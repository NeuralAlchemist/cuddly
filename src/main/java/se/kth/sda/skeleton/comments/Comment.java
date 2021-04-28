package se.kth.sda.skeleton.comments;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.postlikes.PostLike;
import java.util.List;

/**
 * Represents a comment on a {@link Post} as a JPA Entity. This implementation of comment will autogenerate a primary key of type
 * {@link Long} to indicate the current Comment entity. A Comment has a non-null field called {@code relatedPost}. The {@code relatedPost}
 * is a {@link Post} to which the Comment is related. The body of a {@code Comment} cannot be null and is limited to 1500 characters.
 */
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=1500)
    @NotBlank
    private String contentText;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    private User relatedUser;
    
    @OneToMany(mappedBy = "likedPost", cascade = CascadeType.ALL)
    private List<PostLike> listOfCommentLikes;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    @JsonIgnore
    private Post relatedPost;

    public Comment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public Post getRelatedPost() {
        return relatedPost;
    }

    public void setRelatedPost(Post relatedPost) {
        this.relatedPost = relatedPost;
    }
    
    public User getRelatedUser() {
        return relatedUser;
    }

    public void setRelatedUser(User relatedUser) {
        this.relatedUser = relatedUser;
    }

    public List<PostLike> getListOfLikes() {
        return listOfCommentLikes;
    }

    public void setListOfLikes(List<PostLike> listOfCommentLikes) {
        this.listOfCommentLikes = listOfCommentLikes;
    }
}