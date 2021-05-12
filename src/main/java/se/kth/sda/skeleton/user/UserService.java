package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ForbiddenException;

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
     * check if the accountType is valid
     *
     * @param user user who's accountType is checked
     * @return true if accountType is valid, false otherwise
     */
    public boolean isAccountTypeValid(User user) {

        return user.getAccountType().equals("human") ||
                user.getAccountType().equals("pet") ||
                user.getAccountType().equals("service provider") ||
                user.getAccountType().equals("caretaker");
    }

    /**
     * register a user
     *
     * @param user user to be registered
     * save a user in the userRepository
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
}
