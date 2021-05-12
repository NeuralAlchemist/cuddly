package se.kth.sda.skeleton.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.posts.Post;

/**
 * Represents the controller layer (or the API). This exposes application functionality of User as RESTful webservices.
 */
@RestController
public class UserController {

    private UserRepository userRepository;
    private AuthService authService;

    @Autowired
    public UserController(UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
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
     * Update user description for logged in user
     * @param userWithUpdatedDescription the user description
     * @return HTTP ok status and the updated user
     */
    @PutMapping("/users")
    public ResponseEntity<User> updateUserDescription(@RequestBody User userWithUpdatedDescription) {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        String description = userWithUpdatedDescription.getDescription();
        user.setDescription(description);
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);

    }

    /**
     * Update user's accountType for logged in user
     * @param currentUser the user description
     * @return HTTP ok status and the updated user
     */
    @PutMapping("/users/edit")
    public ResponseEntity<User> updateUserAccountType(@RequestBody User currentUser) {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        String accountType = currentUser.getAccountType();
        user.setAccountType(accountType);
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}
