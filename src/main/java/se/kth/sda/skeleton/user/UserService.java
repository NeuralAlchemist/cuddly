package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import se.kth.sda.skeleton.exception.ForbiddenException;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;

import java.io.IOException;
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

    /**
     * Return a user specified by id with image
     *
     * @param id id of the user to be found
     * @param file image of the user to be uploaded
     * @return the User specified
     * @throws ResourceNotFoundException if the user id does not exist
     * @throws ForbiddenException if video is upload for user image
     */
    public User uploadImageProfile(Long id, MultipartFile file){
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        user.setMediaType(file.getContentType());
        user.setImageName(file.getOriginalFilename());
        if(!file.isEmpty()){
            if(file.getContentType().contains("image")){
                byte[] bytes;
                try {
                    bytes = new byte[file.getBytes().length];
                    int i = 0;
                    for (byte b : file.getBytes()){
                        bytes[i++] = b;
                    }
                    user.setImage(bytes);
                } catch (IOException e){
                    e.printStackTrace();
                }
            } else {
                throw new ForbiddenException();
            }
        }
        
        
        return userRepository.save(user);
    }
}
