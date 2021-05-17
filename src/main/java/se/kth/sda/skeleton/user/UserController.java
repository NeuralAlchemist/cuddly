package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import java.util.List;

/**
 * Represents the controller layer (or the API). This exposes application functionality of User as RESTful webservices.
 */
@RestController
public class UserController {

    private UserRepository userRepository;
    private AuthService authService;
    private UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, AuthService authService, UserService userService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.userService = userService;
    }

    /**
     * Return a specific user.
     *
     * @return HTTP ok status and the user
     */
    @GetMapping("/users")
    public ResponseEntity<User> getUser() {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Gets a specific user by id.
     *
     * @return HTTP ok status and the user
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    /**
     * Gets all users
     *
     * @return HTTP ok status and list of users
     */
    @GetMapping("/users/all")
    public ResponseEntity<List<User>> listAllUsers() {
        return ResponseEntity.ok(userService.listAllUsers());
    }

    /**
     * Update user name, description or accountType for logged in user
     *
     * @param userToUpdate the user name, description or accountType
     * @return HTTP ok status and the updated user
     */
    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User userToUpdate) {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        String name = userToUpdate.getName();
        String description = userToUpdate.getDescription();
        String accountType = userToUpdate.getAccountType();

        user.setName(name);
        user.setDescription(description);
        user.setAccountType(accountType);

        if (userService.isAccountTypeValid(user)) {
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        } else
            throw new ForbiddenException();

    }

    /**
     * Handler method for endpoint "/follow/{userid}" with POST HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Creates the buddy relationship between two users.
     * @param userid the User for who is to be followed
     */
    @PostMapping(value = "/follow/{userid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createBuddyRelationship(@PathVariable("userid") Long userid) {
        String email = authService.getLoggedInUserEmail();
        User loginUser = userRepository.findByEmail(email);
        User target = userRepository.findById(userid).orElseThrow(ResourceNotFoundException::new);

        List<User> loginUserBuddies = loginUser.getBuddiesFollowing();
        List<User> targetUserFollowers = target.getFollowerBuddies();

        if (loginUser.getId().equals(userid)) {
            throw new ForbiddenException();
        }
        for (User buddy : loginUserBuddies) {
            if (buddy.getId().equals(userid)) {
                throw new ForbiddenException();
            }
        }

        loginUserBuddies.add(target);
        targetUserFollowers.add(loginUser);

        loginUser.setBuddiesFollowing(loginUserBuddies);
        target.setFollowerBuddies(targetUserFollowers);

        userRepository.save(loginUser);
        userRepository.save(target);

    }

    /**
     * Handler method for endpoint "/follow/{userid}" with DELETE HttpRequest. Invokes a HTTP {@link ResponseStatus} of
     * NO_CONTENT. Deletes the buddy relationship between two users.
     * @param userid the user who will no longer be followed
     */
    @DeleteMapping(value = "/unfollow/{userid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBuddyRelationship(@PathVariable("userid") Long userid) {
        String email = authService.getLoggedInUserEmail();
        User loginUser = userRepository.findByEmail(email);
        User target = userRepository.findById(userid).orElseThrow(ResourceNotFoundException::new);

        List<User> loginUserBuddies = loginUser.getBuddiesFollowing();
        List<User> targetUserFollowers = target.getFollowerBuddies();

        for (User buddy : loginUserBuddies) {
            if (buddy.getId().equals(userid)) {

                loginUserBuddies.remove(target);
                targetUserFollowers.remove(loginUser);

                loginUser.setBuddiesFollowing(loginUserBuddies);
                target.setFollowerBuddies(targetUserFollowers);

                userRepository.save(loginUser);
                userRepository.save(target);
                return;
            }
        }
        throw new ForbiddenException();
    }

    @PutMapping("/users/image/{userid}")
    public ResponseEntity<User> uploadProfileImage(@RequestParam("file") MultipartFile file, @PathVariable("userid") Long userId){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.uploadImageProfile(userId, file));
    }
}
