package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;

import java.util.Collections;
import java.util.List;

@Service()
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Check if the accountType is valid
     *
     * @param user user whose accountType is checked
     * @return true if accountType is valid, false otherwise
     */
    public boolean isAccountTypeValid(User user) {
        return user.getAccountType().equals("human") ||
                user.getAccountType().equals("pet") ||
                user.getAccountType().equals("service provider") ||
                user.getAccountType().equals("caretaker");
    }

    /**
     * Register a user
     *
     * @param user user to be registered
     */
    public void register(User user) {
        String encryptedPass = passwordEncoder.encode(user.getPassword());
        String accountType = user.getAccountType();
        user.setPassword(encryptedPass);
        user.setAccountType(accountType);

        if (this.isAccountTypeValid(user)) {
            userRepository.save(user);
        } else
            throw new ForbiddenException();
    }

    /**
     * Return a user specified by id
     *
     * @param id id of the user to be found
     * @return the User specified
     * @throws ResourceNotFoundException if the user id does not exist
     */
    public User getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return user;
    }

    /**
     * Returns a list of all users
     *
     * @return list of all users
     */
    public List<User> listAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }
}
