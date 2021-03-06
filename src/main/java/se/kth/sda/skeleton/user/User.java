package se.kth.sda.skeleton.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Length;

import se.kth.sda.skeleton.commentlikes.CommentLike;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.postlikes.PostLike;
import se.kth.sda.skeleton.posts.Post;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import java.util.List;

@Entity
@Table(name = "account")
public class User {

    @OneToMany(mappedBy = "relatedPostUser", cascade = CascadeType.ALL)
    List<Post> createdPosts;

    @OneToMany(mappedBy = "relatedCommentUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Comment> createdComments;

    @OneToMany(mappedBy = "likedUser", cascade = CascadeType.ALL)
    List<PostLike> likedPosts;

    @OneToMany(mappedBy = "likedCommentUser", cascade = CascadeType.ALL)
    List<CommentLike> likedComments;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Email(message = "Invalid email address! Please provide a valid email address")
    @NotEmpty(message = "Please provide an email address")
    @Column(name = "email", unique = true)
    private String email;


    @Length(min = 5, max = 100, message = "Password length most be between 5-100 characters")
    @Column(name = "password")
    private String password;

    @Length(min = 3, max = 100, message = "Name must be between 3-100 characters")
    @Column(name = "name")
    private String name;


    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "accountType")
    private String accountType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "buddyRelationship",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "buddyId"))
    @JsonIgnoreProperties({"likedPosts", "likedComments"})
    private List<User> buddiesFollowing;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"createdPosts", "likedPosts", "likedComments", "buddiesFollowing", "followerBuddies"})
    private List<User> followerBuddies;

    private byte[] image;
    private String mediaType;
    private String imageName;

    // Hibernate needs a default constructor to function
    public User() {
    }

    public User(@Email(message = "Invalid email address! Please provide a valid email address") @NotEmpty(message = "Please provide an email address") String email, @Length(min = 5, max = 100, message = "Password length must be between 5-100 characters") String password, @Length(min = 3, max = 100, message = "Name must be between 3-100 characters") String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    @JsonProperty(value = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Post> getCreatedPosts() {
        return createdPosts;
    }

    public void setCreatedPosts(List<Post> createdPosts) {
        this.createdPosts = createdPosts;
    }

    public List<PostLike> getLikedPosts() {
        return likedPosts;
    }

    public void setLikedPosts(List<PostLike> likedPosts) {
        this.likedPosts = likedPosts;
    }

    public List<Comment> getCreatedComments() {
        return createdComments;
    }

    public void setCreatedComments(List<Comment> createdComments) {
        this.createdComments = createdComments;
    }

    public List<CommentLike> getLikedComments() {
        return likedComments;
    }

    public void setLikedComments(List<CommentLike> likedComments) {
        this.likedComments = likedComments;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public List<User> getBuddiesFollowing() {
        return buddiesFollowing;
    }

    public void setBuddiesFollowing(List<User> buddies) {
        this.buddiesFollowing = buddies;
    }

    public List<User> getFollowerBuddies() {
        return followerBuddies;
    }

    public void setFollowerBuddies(List<User> followerBuddies) {
        this.followerBuddies = followerBuddies;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
    
}
