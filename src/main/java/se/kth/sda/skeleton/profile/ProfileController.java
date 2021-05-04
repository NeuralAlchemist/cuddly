package se.kth.sda.skeleton.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
/**
 * Represents the controller layer (or the API). This exposes application functionality of Profile as RESTful webservices.
 */
@RestController
@RequestMapping("/profile")
public class ProfileController {

    ProfileService profileService;

    /**
     * Constructs a ProfileController and automatically assigns its profileService field.
     *
     * @param profileService an object that implements interface ProfileService
     */
    @Autowired
    public ProfileController(ProfileService profileService){
        this.profileService = profileService;
    }

    /**
     * Return a specific profile based on ID
     *
     * @param profileId the id of the specific profile
     * @return HTTP ok status of displaying profile
     */
    @GetMapping("/{profileId}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long profileId) {
        Profile profile = profileService.getProfileById(profileId);
        return ResponseEntity.ok(profile);
    }


    /**
     * Return a list of all profiles
     *
     * @return status 200 and list of profiles
     */
    @GetMapping("")
    public ResponseEntity<List<Profile>> listAllProfiles() {
        return ResponseEntity.ok(profileService.listAllProfiles());
    }

    /**
     * Create a new post
     *
     * @param profile newly created post
     * @return http status created and post
     */
    @PostMapping("")
    public ResponseEntity<Profile> createPost(@Valid @RequestBody Profile profile) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(profileService.createProfile(profile));
    }

    /**
     * Update a profile based on ID
     *
     * @param profileId ID of the profile to edit
     * @param updatedProfile newly created body to update the profile
     * @return status 200 and updated profile
     */
    @PutMapping("/{profileId}")
    public ResponseEntity<Profile> updatePost(@PathVariable Long profileId, @RequestBody Profile updatedProfile) {
        Profile profile = profileService.updateProfile(profileId, updatedProfile);
        return ResponseEntity.ok(profile);
    }

    /**
     * Delete a profile based on ID
     *
     * @param profileId ID of the profile to delete
     */
    @DeleteMapping("/{profileId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@PathVariable Long profileId) {
        profileService.deleteProfile(profileId);
    }
    
}
