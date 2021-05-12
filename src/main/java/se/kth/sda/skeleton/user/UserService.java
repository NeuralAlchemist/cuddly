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

    public void register(User user) {
        String encryptedPass = passwordEncoder.encode(user.getPassword());
        String accountType = user.getAccountType();
        user.setPassword(encryptedPass);
        user.setAccountType(accountType);

        if (user.getAccountType().equals("human") ||
                user.getAccountType().equals("pet") ||
                user.getAccountType().equals("service provider") ||
                user.getAccountType().equals("caretaker")) {
            userRepository.save(user);
        } else
            throw new ForbiddenException();
    }
}
