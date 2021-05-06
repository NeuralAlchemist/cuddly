package se.kth.sda.skeleton.commentlikes;

import com.fasterxml.jackson.annotation.*;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.user.User;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Represents a Like on a {@code Comment} in a cuddly app as a JPA entity. This implementation of CommentLike will autogenerate a primary key of type
 * {@link Long} to indicate the current CommentLike entity. A Comment has a {@link String} contentText.
 */
@Entity
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    @JsonIgnore
    private Comment likedComment;

    @ManyToOne
    @JsonIgnoreProperties({"createdPosts", "likedPosts", "likedComments"})
    @JoinColumn(nullable = false)
    private User likedCommentUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Comment getLikedComment() {
        return likedComment;
    }

    public void setLikedComment(Comment likedComment) {
        this.likedComment = likedComment;
    }

    public User getLikedCommentUser() {
        return likedCommentUser;
    }

    public void setLikedCommentUser(User likedCommentUser) {
        this.likedCommentUser = likedCommentUser;
    }
}
