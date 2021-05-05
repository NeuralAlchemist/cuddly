package se.kth.sda.skeleton.profile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserRepository;

@Service
public class ProfileService {

    private ProfileRepository profileRepository;
    private UserRepository userRepository;
    private AuthService authService;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, 
    UserRepository userRepository, AuthService authService){
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public Profile getProfileById(Long id){
        Profile profile = profileRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return profile;
    }

    /**
     * Return a list of all profiles
     *
     * @return list of profiles in reverse order from profileRepository
     */
    public List<Profile> listAllProfiles() {
        List<Profile> profiles = profileRepository.findAll();
        Collections.reverse(profiles); //Shows newer posts first
        return profiles;
    }

    //TODO
    // included with image of the profile
    public Profile createProfile(Profile newProfile){
        String loggedInUser = authService.getLoggedInUserEmail();
        LocalDateTime createdTime = LocalDateTime.now();
        
        User relatedUser = userRepository.findByEmail(loggedInUser);  
        newProfile.setCreatedTime(createdTime);
        newProfile.setRelatedProfileUser(relatedUser);
        newProfile.setActiveProfile(true);

        relatedUser.getCreatedProfiles().add(newProfile);
        Profile profile = profileRepository.save(newProfile);
        return profile;
    }

    //TODO
    // profile image updates
    public Profile updateProfile(Long id, Profile updatedProfile){
        Profile profile = profileRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        LocalDateTime createdTime = LocalDateTime.now();
        String loggedInUserEmail = authService.getLoggedInUserEmail();

        User loggedInUser = userRepository.findByEmail(loggedInUserEmail);
        if (!loggedInUserEmail.equals(profile.getRelatedProfileUser().getEmail())) {
            throw new ForbiddenException();
        }
        updatedProfile.setId(id);
        updatedProfile.setCreatedTime(createdTime);
        updatedProfile.setRelatedProfileUser(loggedInUser);
        updatedProfile.setActiveProfile(true);

        Profile newProfile = profileRepository.save(updatedProfile);
        return newProfile;
    }

    /**
     * Disactivate a profile based on ID
     *
     * @param id ID of the profile to disativate
     */
    public Profile disactiveProfile(Long id){
        Profile profile = profileRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String loggedInUserEmail = authService.getLoggedInUserEmail();
        if (loggedInUserEmail.equals(profile.getRelatedProfileUser().getEmail())) {
            profile.setActiveProfile(false);
        } else {
            throw new ForbiddenException();
        }
        return profile;
    }

    /**
     * Delete a prifile based on ID
     *
     * @param id ID of the profile to delete
     */
    public void deleteProfile(Long id) {
        Profile profile = profileRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String loggedInUserEmail = authService.getLoggedInUserEmail();
        if (loggedInUserEmail.equals(profile.getRelatedProfileUser().getEmail())) {
            profile.getRelatedProfileUser().getCreatedPosts().remove(profile);
            profileRepository.delete(profile);
        } else {
            throw new ForbiddenException();
        }
    }

    
}
