package se.kth.sda.skeleton.profile;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;

import se.kth.sda.skeleton.user.User;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String displayDescription;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private Boolean activeProfile;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @JsonIgnoreProperties("createdProfiles")
    private User relatedProfileUser;

    private LocalDateTime createdTime;

    // Constructor
    public Profile(){

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getDisplayDescription() {
        return displayDescription;
    }

    public void setDisplayDescription(String displayDescription) {
        this.displayDescription = displayDescription;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public User getRelatedProfileUser() {
        return relatedProfileUser;
    }

    public void setRelatedProfileUser(User relatedProfileUser) {
        this.relatedProfileUser = relatedProfileUser;
    }

    public Boolean getActiveProfile() {
        return activeProfile;
    }

    public void setActiveProfile(Boolean activeProfile) {
        this.activeProfile = activeProfile;
    } 
    
    
}
