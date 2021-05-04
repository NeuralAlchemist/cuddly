package se.kth.sda.skeleton.postlikes;

import com.fasterxml.jackson.annotation.*;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Represents a Like on a {@code Post} in a cuddly app as a JPA entity. This implementation of PostLike will autogenerate a primary key of type
 * {@link Long} to indicate the current PostLike entity. A Post has a {@link String} contentText.
 */
@Entity
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    @JsonIgnore
    private Post likedPost;

    @ManyToOne
    @JsonIgnoreProperties({"createdPosts", "likedPosts"})
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    private User likedUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getLikedPost() {
        return likedPost;
    }

    public void setLikedPost(Post likedPost) {
        this.likedPost = likedPost;
    }

    public User getLikedUser() {
        return likedUser;
    }

    public void setLikedUser(User likedUser) {
        this.likedUser = likedUser;
    }
}
