package se.kth.sda.skeleton.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.posts.Post;

@RestController
public class UserController {

    private UserService userService;
    private UserRepository userRepository;
    private AuthService authService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository, AuthService authService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @GetMapping("/users")
    // @JsonIgnoreProperties("password")
    public ResponseEntity<User> getUser() {
        String email = authService.getLoggedInUserEmail();
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user);
    }
}
