package se.kth.sda.skeleton.user;

import org.hibernate.validator.constraints.Length;

import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.postlikes.PostLike;
import se.kth.sda.skeleton.posts.Post;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Table(name="account")
public class User {

    @OneToMany(mappedBy = "relatedUser", cascade = CascadeType.ALL)
    List<Post> createdPosts;

    @OneToMany(mappedBy = "relatedUser", cascade = CascadeType.ALL)
    List<Comment> createdComments;

    @OneToMany(mappedBy = "likedUser", cascade = CascadeType.ALL)
    List<PostLike> likedPosts;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Email(message = "Invalid email address! Please provide a valid email address")
    @NotEmpty(message = "Please provide an email address")
    @Column(name = "email", unique = true)
    private String email;


    @Length(min = 5, max=100, message = "Password length most be between 5-100 characters")
    @Column(name = "password")
    private String password;

    @Length(min = 3, max=100, message = "Name must be between 3-100 characters")
    @Column(name = "name")
    private String name;

    // Hibernate needs a default constructor to function
    public User() {}

    public User(@Email(message = "Invalid email address! Please provide a valid email address") @NotEmpty(message = "Please provide an email address") String email, @Length(min = 5, max = 100, message = "Password length most be between 5-100 characters") String password, @Length(min = 3, max = 100, message = "Name must be between 3-100 characters") String name) {
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
}
