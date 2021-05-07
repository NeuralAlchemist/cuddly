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
    private UserService userService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository, AuthService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this. userService = userService;
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
     * @param description the user description
     * @return HTTP ok status and the updated user
     */
    @PutMapping("/users")
    public ResponseEntity<User> updateUserDescription(@RequestBody String description) {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        user.setDescription(description);
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);

    }
}
