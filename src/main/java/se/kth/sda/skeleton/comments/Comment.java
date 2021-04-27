package se.kth.sda.skeleton.comments;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;


@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=1500)
    @NotBlank
    private String contentText;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @JsonIgnore
    private Post relatedPost;

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

}