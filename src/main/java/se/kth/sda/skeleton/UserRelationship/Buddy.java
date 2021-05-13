package se.kth.sda.skeleton.UserRelationship;

import se.kth.sda.skeleton.user.User;

import javax.persistence.*;


public class Buddy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="from_user_fk")
    private User follower;

    @ManyToOne
    @JoinColumn(name="to_user_fk")
    private User followed;

    public Buddy() {};

    public Buddy(User follower, User followed) {
        this.follower = follower;
        this.followed = followed;
    }
}
