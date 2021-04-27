package se.kth.sda.skeleton.posts;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.user.User;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Represents a post in a cuddly app as a JPA entity. This implementation of post will autogenerate a primary key of type
 * {@link Long} to indicate the current Post entity. A Post has a {@link String} contentText.
 */
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String contentText;
    @OneToMany(mappedBy = "relatedPost", cascade = CascadeType.ALL)
    private List<Comment> relatedComments;
    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "name")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User relatedUser;
    // Constructor
    public Post() {
    }

    // Getters and Setters
    public Post(String contentText) {
        this.contentText = contentText;
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

    public List<Comment> getRelatedComments() {
        return relatedComments;
    }

    public void setRelatedComments(List<Comment> relatedComments) {
        this.relatedComments = relatedComments;
    }

    public User getRelatedUser() {
        return relatedUser;
    }

    public void setRelatedUser(User relatedUser) {
        this.relatedUser = relatedUser;
    }
}
