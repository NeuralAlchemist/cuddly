package se.kth.sda.skeleton.comments;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import javax.validation.constraints.*;

import se.kth.sda.skeleton.commentlikes.CommentLike;
import se.kth.sda.skeleton.postlikes.PostLike;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;
import java.time.LocalDateTime;
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

    @Column(nullable = false, name="contentText", length=500)
    @NotBlank
    private String contentText;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @JsonIgnoreProperties({"createdPosts", "likedPosts"})
    private User relatedCommentUser;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    @JsonIgnore
    private Post relatedPost;

    @OneToMany(mappedBy = "likedComment", cascade = CascadeType.ALL)
    private List<CommentLike> listOfCommentLikes;

    LocalDateTime createdTime;

    @Lob
    private byte[] fileByte;

    private String fileType;

    private String fileName;

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
    
    public User getRelatedCommentUser() {
        return relatedCommentUser;
    }

    public void setRelatedCommentUser(User relatedCommentUser) {
        this.relatedCommentUser = relatedCommentUser;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public List<CommentLike> getListOfCommentLikes() {
        return listOfCommentLikes;
    }

    public void setListOfCommentLikes(List<CommentLike> listOfCommentLikes) {
        this.listOfCommentLikes = listOfCommentLikes;
    }

    public byte[] getFileByte() {
        return fileByte;
    }

    public void setFileByte(byte[] fileByte) {
        this.fileByte = fileByte;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
}