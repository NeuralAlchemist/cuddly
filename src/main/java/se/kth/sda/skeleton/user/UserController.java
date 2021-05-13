package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.postlikes.PostLike;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @PostMapping(value = "/follow/{userid}")
    public ResponseEntity<User> follow(@PathVariable("userid") Long userid) {
        String email = authService.getLoggedInUserEmail();
        User loginUser = userRepository.findByEmail(email);
        User target = userRepository.findById(userid).orElseThrow(ResourceNotFoundException::new);
        List<User> loginUserBuddies = loginUser.getBuddies();

        if (loginUser.getId().equals(userid)) {
            throw new ForbiddenException();
        }
        for (User buddy : loginUserBuddies) {
            if (buddy.getId().equals(userid)) {
                throw new ForbiddenException();
            }
        }

        loginUserBuddies.add(target);
        loginUser.setBuddies(loginUserBuddies);
        userRepository.save(loginUser);

        return ResponseEntity.ok(loginUser);

    }

}
