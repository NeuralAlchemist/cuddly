package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.exception.ForbiddenException;

@Service()
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isAccountTypeValid(User user) {

        return user.getAccountType().equals("human") ||
                user.getAccountType().equals("pet") ||
                user.getAccountType().equals("service provider") ||
                user.getAccountType().equals("caretaker");
    }

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
